import React, { useState, useEffect } from "react";
import LabeledNumberInput from "./LabeledNumberInput";
import AnimatedButton from "./AnimatedButton";
import StatsDisplay from "./StatsDisplay";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { useUserPosition } from "../hooks/useUserPosition";
import { useDepositAndMint } from "../hooks/useDepositAndMint";
import { useUserBalance } from "../hooks/useUserBalance";
import {
  calculateCollateralRatio,
  INFINITY_BIGINT,
} from "../utils/collateralRatio";
import { formatUnits, parseUnits } from "viem";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";

const DepositAndMintTab: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [debouncedDepositAmount] = useDebounce(depositAmount, 500);

  const [mintAmount, setMintAmount] = useState<string>("");
  const [debouncedMintAmount] = useDebounce(mintAmount, 500);

  const [isExecuting, setIsExecuting] = useState(false);

  const { ethPriceInUsd } = useEthPriceInUsd();
  const { debtAmount, collateralAmount, fetchUserPosition } = useUserPosition();
  const { ethBalance, fetchEthBalance } = useUserBalance();

  const { depositAndMint, mint } = useDepositAndMint();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset inputs after the transaction is executed
    if (!isExecuting) {
      setDepositAmount("");
      setMintAmount("");
    }
  }, [isExecuting]);

  const handleDepositChange = (value: string) => {
    setDepositAmount(value);
    if (error) setError(null);
  };

  const handleMintChange = (value: string) => {
    setMintAmount(value);
    if (error) setError(null);
  };

  // Calculate the new debt and collateral amounts after the transaction
  const newDebtAmount =
    (debtAmount || 0n) + parseUnits(debouncedMintAmount || "0", 18);

  const newCollateralAmount =
    (collateralAmount || 0n) + parseUnits(debouncedDepositAmount || "0", 18);

  // Calculate the collateral ratios
  const collateralRatioBefore = calculateCollateralRatio(
    collateralAmount || 0n,
    debtAmount || 0n,
    ethPriceInUsd
  );

  const collateralRatioAfter = calculateCollateralRatio(
    newCollateralAmount || 0n,
    newDebtAmount || 0n,
    ethPriceInUsd
  );

  const handleMintAndDeposit = async () => {
    const depositAmountInUnits = parseUnits(debouncedDepositAmount || "0", 18);
    const mintAmountInUnits = parseUnits(debouncedMintAmount || "0", 18);

    if (!depositAmountInUnits && !mintAmountInUnits) {
      setError("Both deposit and mint amounts cannot be zero.");
      return;
    }

    fetchEthBalance();

    if ((ethBalance as bigint) < depositAmountInUnits) {
      setError("Insufficient ETH balance");
      return;
    }

    if (collateralAmount === 0n && depositAmountInUnits < parseUnits("1", 18)) {
      setError("Initial deposit must be at least 1 ETH");
      return;
    }

    if (collateralRatioAfter < parseUnits("160", 18)) {
      setError("The new collateral ratio is lower than the Min Coll Ratio.");
      return;
    }

    setIsExecuting(true);
    if (depositAmountInUnits) {
      try {
        await depositAndMint(depositAmountInUnits, mintAmountInUnits);
        await fetchUserPosition();
        toast.success("Mint and deposit successful", {
          position: "top-center",
        });
      } catch (err) {
        console.error("Deposit and Mint transaction failed:", err);
        toast.error("Deposit & Mint transaction failed", {
          position: "top-center",
        });
      }
    } else {
      try {
        await mint(mintAmountInUnits);
        await fetchUserPosition();
        toast.success("Mint successful", {
          position: "top-center",
        });
      } catch (err) {
        console.error("Mint transaction failed:", err);
        toast.error("Mint transaction failed", {
          position: "top-center",
        });
      }
    }
    setIsExecuting(false);
  };

  const stats = [
    {
      label: "Price of ETH in USD",
      value: formatUnits(ethPriceInUsd || 0n, 18),
    },
    {
      label: "Debt",
      value: formatUnits(debtAmount || 0n, 18),
      newValue: formatUnits(newDebtAmount, 18),
      deltaColor: "text-red-500",
      displayChange: (debtAmount || 0n) !== newDebtAmount,
    },
    {
      label: "Collateral",
      value: formatUnits(collateralAmount || 0n, 18),
      newValue: formatUnits(newCollateralAmount, 18),
      deltaColor: "text-green-500",
      displayChange: (collateralAmount || 0n) !== newCollateralAmount,
    },
    {
      label: "Collateral Ratio",
      value:
        collateralRatioBefore === INFINITY_BIGINT
          ? "∞"
          : `${formatUnits(collateralRatioBefore, 18)}%`,
      newValue:
        collateralRatioAfter === INFINITY_BIGINT
          ? "∞"
          : `${formatUnits(collateralRatioAfter, 18)}%`,
      deltaColor:
        collateralRatioAfter < collateralRatioBefore
          ? "text-red-500"
          : "text-green-500",
      displayChange: collateralRatioBefore !== collateralRatioAfter,
    },
  ];

  return (
    <div className="flex flex-col justify-end h-full">
      <div className="flex flex-col justify-around gap-5 h-4/6 m-5 p-5">
        <LabeledNumberInput
          value={depositAmount}
          setValue={handleDepositChange}
          description="Deposit ETH"
          id="deposit"
          isDisabled={isExecuting}
        />
        <LabeledNumberInput
          value={mintAmount}
          setValue={handleMintChange}
          description="Mint AnchorUSD"
          id="mint"
          isDisabled={isExecuting}
        />

        {error && (
          <div
            className="p-4 text-sm rounded-lg bg-gray-800 text-red-500"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="flex mt-auto">
          <AnimatedButton
            onClick={handleMintAndDeposit}
            isDisabled={isExecuting}
          >
            Mint
          </AnimatedButton>
        </div>
      </div>
      <StatsDisplay stats={stats} />
    </div>
  );
};

export default DepositAndMintTab;
