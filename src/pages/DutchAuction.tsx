import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import LabeledNumberInput from "../components/LabeledNumberInput";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import {  formatUnits, parseUnits } from "viem";
import StatsDisplay from "../components/StatsDisplay";
import { useContractAddress } from "../hooks/useContractAddress";
import {
  useReadAnchorEngineFeeShareBps,
  useReadAnchorEngineGetDutchAuctionDiscountPrice,
  useReadAnchorEngineGetHarvestableYield,
  useReadAnchorEngineGetTimePassedSinceRebase,
} from "../abis";
import { calculatePercentage } from "../utils/percentage";
import { useDebounce } from "use-debounce";
import { useUserBalance } from "../hooks/useUserBalance";
import { toast } from "react-toastify";
import { useHarvestAndAuctionYield } from "../hooks/useHarvestAndAuctionYield";
import { useAnchorUsdApprove } from "../hooks/useAnchorUsdApprove";
import ErrorDisplay from "../components/ErrorDisplay";


const MAX_BASIS_POINTS = 10000n;

const DutchAuctionPage: React.FC = () => {
  const { ethPriceInUsd, refetchEthPriceInUsd } = useEthPriceInUsd();
  const { anchorEngineAddress } = useContractAddress();
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [debouncedBuyAmount] = useDebounce(buyAmount, 500);

  const { data: discountRate, refetch: refetchDiscountRate } =
    useReadAnchorEngineGetDutchAuctionDiscountPrice({
      address: anchorEngineAddress,
    });
  const { data: timeSinceRebase, refetch: refetchTimeSinceRebase } =
    useReadAnchorEngineGetTimePassedSinceRebase({
      address: anchorEngineAddress,
    });

  const [assetPrice, setAssetPrice] = useState<string>("");

  const [timeLeftInSecs, setTimeLeftInSecs] = useState<bigint>(0n);

  const { data: harvestableYield, refetch: refetchHarvestableYield } =
    useReadAnchorEngineGetHarvestableYield({
      address: anchorEngineAddress,
    });

  const { data: feeShareBps } = useReadAnchorEngineFeeShareBps({
    address: anchorEngineAddress,
  });

  const { anchorUsdBalance, fetchAnchorUsdBalance } = useUserBalance();

  const { harvestAndAuctionYield } = useHarvestAndAuctionYield();
  const { approve } = useAnchorUsdApprove();

  const redistributionRate = feeShareBps ? MAX_BASIS_POINTS - feeShareBps : 0n;

  const calculateTimeLeft = (timeSinceRebase: bigint): bigint =>
    30n * 60n - (timeSinceRebase % (30n * 60n));

  useEffect(() => {
    // Reset inputs after the transaction is executed
    if (!isExecuting) {
      setBuyAmount("");
    }
  }, [isExecuting]);

  useEffect(() => {
    const setupCountdown = async () => {
      try {
        // Initial setup
        const timeSinceRebaseCached =
          timeSinceRebase || (await refetchTimeSinceRebase()).data;
        const discountRateCached =
          discountRate || (await refetchDiscountRate()).data;
        const ethPriceInUsdCached =
          ethPriceInUsd || (await refetchEthPriceInUsd()).data;

        if (
          timeSinceRebaseCached &&
          discountRateCached &&
          ethPriceInUsdCached
        ) {
          // Calculate initial values
          let currentTimeLeft = calculateTimeLeft(timeSinceRebaseCached);
          setTimeLeftInSecs(currentTimeLeft);

          const initialAssetPrice = calculatePercentage(
            ethPriceInUsdCached,
            discountRateCached
          );
          setAssetPrice(formatUnits(initialAssetPrice, 18));

          // Start timer
          const interval = setInterval(() => {
            currentTimeLeft -= 1n;

            if (currentTimeLeft <= 0n) {
              // Refetch when countdown reaches zero
              (async () => {
                const newTimeSinceRebase = (await refetchTimeSinceRebase())
                  .data;
                const newDiscountRate = (await refetchDiscountRate()).data;
                const newEthPrice = (await refetchEthPriceInUsd()).data;

                if (newTimeSinceRebase && newDiscountRate && newEthPrice) {
                  currentTimeLeft = calculateTimeLeft(newTimeSinceRebase);
                  setTimeLeftInSecs(currentTimeLeft);

                  const updatedAssetPrice = calculatePercentage(
                    newEthPrice,
                    newDiscountRate
                  );
                  setAssetPrice(formatUnits(updatedAssetPrice, 18));
                }
              })();
            } else {
              // Regular countdown
              setTimeLeftInSecs(currentTimeLeft);
            }
          }, 1000);

          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error("Error setting up countdown:", err);
      }
    };

    setupCountdown();
  }, []);

  useEffect(() => {
    if (ethPriceInUsd && discountRate) {
      const assetPrice = calculatePercentage(ethPriceInUsd, discountRate);
      setAssetPrice(formatUnits(assetPrice, 18));
    }
  }, [ethPriceInUsd]);

  const handleBuy = async () => {
    const buyAmountInWei = parseUnits(debouncedBuyAmount || "0", 18);

    if (!harvestableYield || harvestableYield === 0n) {
      setError("No harvestable yield available.");
      return;
    }
    if (!buyAmountInWei) {
      setError("Buy amount cannot be zero.");
      return;
    }

    if (buyAmountInWei > (harvestableYield || 0n)) {
      setError("Cannot buy more than harvestable yield.");
      return;
    }

    const assetPriceInWei = parseUnits(assetPrice || "0", 18);

    const totalCostInUnits =
      (buyAmountInWei * assetPriceInWei) / parseUnits("1", 18);

    if ((anchorUsdBalance || 0n) < totalCostInUnits) {
      setError("Insufficient AnchorUSD Balance");
      return;
    }

    setIsExecuting(true);
    try {
      await approve(totalCostInUnits);
      await harvestAndAuctionYield(buyAmountInWei);
      await refetchHarvestableYield();
      await fetchAnchorUsdBalance();
      toast.success("Harvest and Buy Transaction successful", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Harvest and Buy transaction failed:", err);
      toast.error("Harvest and Buy transaction failed", {
        position: "top-center",
      });
    }
    setIsExecuting(false);
  };

  const handleBuyAmountChange = (value: string) => {
    setBuyAmount(value);
    if (error) setError(null);
  };

  const stats = [
    {
      label: "Price of ETH in USD",
      value: `$${formatUnits(ethPriceInUsd || 0n, 18)}`,
    },
    {
      label: "Harvestable StETH Yield",
      value: `${formatUnits(harvestableYield || 0n, 18)} ETH`,
    },
    {
      label: "Discount Rate",
      value: `${formatUnits(discountRate ? MAX_BASIS_POINTS - discountRate : 0n, 2)}%`,
    },
    {
      label: "Yield Redistribution Rate",
      value: `${formatUnits(redistributionRate, 2)}%`,
    },
  ];

  return (
    <div className="flex-grow flex flex-col items-center justify-center overflow-hidden max-w-5xl mx-auto w-full">
      <div className="bg-secondary shadow-lg shadow-primary rounded-3xl w-11/12 md:w-8/12">
        <div className=" flex flex-col justify-around gap-4 px-8 py-2 text-center">
          <div className="relative px-8 py-2 text-accent">
            {/* Subtle Background Blur Elements */}

            {/* Banner Section */}
            <div className="relative z-10">
              <div className="text-center mb-2">
                <motion.div
                  className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full shadow-md"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm font-semibold text-[#e2e8f0] uppercase">
                    🔥 Limited Time Offer 🔥
                  </span>
                </motion.div>
                <h1 className="text-4xl font-bold mt-4 tracking-tight text-accent">
                  Dutch Auction for{" "}
                  {/* <span className="text-lightBlue font-extrabold"> */}
                  StETH
                  {/* </span> */}
                </h1>
                <p className="text-sm font-light mt-2 opacity-80 text-accent">
                  Grab harvested StETH before the price hits rock bottom!
                </p>
              </div>

              {/* Price Section */}
              <div className="relative z-10 bg-white bg-opacity-10 rounded-xl shadow-lg p-6 backdrop-blur-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm uppercase tracking-wide">
                      Current Price
                    </p>
                    <p className="text-2xl font-extrabold text-lightBlue">
                      ${assetPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm uppercase tracking-wide">
                      Next Price Drop In
                    </p>
                    <p className="text-lg font-medium text-[#f87171]">
                      {`${(timeLeftInSecs / 60n).toString().padStart(2, "0")} min `}
                      {`${(timeLeftInSecs % 60n).toString().padStart(2, "0")} sec`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:w-5/6 sm:mx-auto">
            <LabeledNumberInput
              value={buyAmount.toString()}
              setValue={handleBuyAmountChange}
              description="Buy Lido StETH"
              id="buy-steth"
              isDisabled={false}
            />
            <ErrorDisplay error={error} />
            <AnimatedButton onClick={handleBuy} isDisabled={isExecuting}>
              Buy Now
            </AnimatedButton>
          </div>
        </div>
        <StatsDisplay stats={stats} />
      </div>
    </div>
  );
};

export default DutchAuctionPage;
