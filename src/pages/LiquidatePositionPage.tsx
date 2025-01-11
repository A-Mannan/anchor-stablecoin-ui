import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LabeledNumberInput from "../components/LabeledNumberInput";
import AnimatedButton from "../components/AnimatedButton";
import { Address, formatUnits, parseUnits } from "viem";
import StatsDisplay from "../components/StatsDisplay";
import ErrorDisplay from "../components/ErrorDisplay";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { useUserPosition } from "../hooks/useUserPosition";
import {
  calculateCollateralRatio,
  INFINITY_BIGINT,
} from "../utils/collateralRatio";
import { useDebounce } from "use-debounce";
import { calculateEthOutOnLiquidation } from "../utils/liquidation";
import { formatNumber } from "../utils/formatNumber";
import SlippageInput from "../components/SlippageInput";
import { useUserBalance } from "../hooks/useUserBalance";
import { toast } from "react-toastify";
import { useLiquidatePosition } from "../hooks/useLiquidatePosition";
import { calculateAmountWithSlippage } from "../utils/redemption";
import { useAnchorUsdApprove } from "../hooks/useAnchorUsdApprove";

const LiquidatePositionPage: React.FC = () => {
  const [debtPaymentAmount, setDebtPaymentAmount] = useState<string | "">("");
  const [debouncedDebtPaymentAmount] = useDebounce(debtPaymentAmount, 500);
  const [slippage, setSlippage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between pages
  const { id } = useParams<{ id: string }>();
  const { ethPriceInUsd } = useEthPriceInUsd();
  const { debtAmount, collateralAmount, fetchUserPosition } = useUserPosition(
    id as Address
  );
  const { anchorUsdBalance, fetchAnchorUsdBalance } = useUserBalance();
  const { liquidate } = useLiquidatePosition();
  const { approve } = useAnchorUsdApprove();

  const handleDebtPaymentAmountChange = (value: string) => {
    setDebtPaymentAmount(value);
    if (error) setError(null);
  };

  // Calculate the collateral ratios
  const collateralRatioBefore = calculateCollateralRatio(
    collateralAmount || 0n,
    debtAmount || 0n,
    ethPriceInUsd
  );

  const newDebtAmount =
    (debtAmount || 0n) - parseUnits(debouncedDebtPaymentAmount || "0", 18);

  const collateralOut = calculateEthOutOnLiquidation(
    ethPriceInUsd || 0n,
    parseUnits(debouncedDebtPaymentAmount || "0", 18),
    collateralRatioBefore
  );

  const newCollateralAmount = (collateralAmount || 0n) - collateralOut;

  const collateralRatioAfter = calculateCollateralRatio(
    newCollateralAmount,
    newDebtAmount,
    ethPriceInUsd
  );

  const discountRate =
    collateralRatioBefore > parseUnits("100", 18)
      ? collateralRatioBefore - parseUnits("100", 18)
      : 0n;

  const stats = [
    {
      label: "Price of ETH in USD",
      value: `$${formatUnits(ethPriceInUsd || 0n, 18)}`,
    },
    {
      label: "Borrower Debt",
      value: `$${formatNumber(formatUnits(debtAmount || 0n, 18))}`,
      newValue: `$${formatNumber(formatUnits(newDebtAmount, 18))}`,
      displayChange: (debtAmount || 0n) !== newDebtAmount,
    },
    {
      label: "Borrower Collateral",
      value: `${formatNumber(formatUnits(collateralAmount || 0n, 18))} ETH`,
      newValue: `${formatNumber(formatUnits(newCollateralAmount, 18))} ETH`,
      displayChange: (collateralAmount || 0n) !== newCollateralAmount,
    },
    {
      label: "Borrower Collateral Ratio",
      value:
        collateralRatioBefore === INFINITY_BIGINT
          ? "∞"
          : `${formatNumber(formatUnits(collateralRatioBefore, 18))}%`,
      newValue:
        collateralRatioAfter === INFINITY_BIGINT
          ? "∞"
          : `${formatNumber(formatUnits(collateralRatioAfter, 18))}%`,
      displayChange: collateralRatioBefore !== collateralRatioAfter,
    },
    {
      label: "Liquidatable Collateral",
      value: `${formatNumber(formatUnits(collateralOut, 18))} ETH`,
    },
    {
      label: "Discount Rate",
      value: `${formatNumber(formatUnits(discountRate, 18))}%`,
    },
  ];

  const handleLiquidate = async () => {
    const debtPaymentAmountInUnits = parseUnits(
      debouncedDebtPaymentAmount || "0",
      18
    );

    if (!debtPaymentAmountInUnits) {
      setError("Debt Payment cannot be zero.");
      return;
    }

    if (debtPaymentAmountInUnits > (debtAmount || 0n)) {
      setError("Cannot pay off more than debt");
      return;
    }

    fetchAnchorUsdBalance();

    if ((anchorUsdBalance as bigint) < debtPaymentAmountInUnits) {
      setError("Insufficient AnchorUSD Balance");
      return;
    }

    const minEthOut = calculateAmountWithSlippage(collateralOut, slippage);

    setIsExecuting(true);
    try {
      await approve(debtPaymentAmountInUnits);
      await liquidate(id as Address, debtPaymentAmountInUnits, minEthOut);
      await fetchUserPosition();
      toast.success("Liquidation successful", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Liquidation transaction failed:", err);
      toast.error("Liquidation transaction failed", {
        position: "top-center",
      });
    }
    setIsExecuting(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-5xl mx-auto w-full overflow-hidden">
      {/* Back Button */}
      <div className="self-start px-6">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="text-lightBlue transition-all duration-300 border border-lightBlue hover:text-primary hover:bg-lightBlue rounded-lg px-4 py-2"
        >
          &larr; Back
        </button>
      </div>

      {/* Container for the rounded box */}
      <div className="bg-secondary shadow-lg rounded-3xl w-7/12">
        {/* Title */}
        <div className="flex flex-col justify-around items-center p-6 gap-4">
          <h2 className="text-2xl font-semibold text-accent text-center mb-4">
            Liquidate Position
          </h2>

          {/* Input Fields */}
          <LabeledNumberInput
            value={debtPaymentAmount}
            setValue={handleDebtPaymentAmountChange}
            description="Payoff Debt"
            id="payoff-debt"
            isDisabled={isExecuting}
          />

          <SlippageInput slippage={slippage} setSlippage={setSlippage} />

          <ErrorDisplay error={error}></ErrorDisplay>

          {/* Button */}
          <AnimatedButton onClick={handleLiquidate} isDisabled={isExecuting}>
            Liquidate
          </AnimatedButton>
        </div>
        <StatsDisplay stats={stats}></StatsDisplay>
      </div>
    </div>
  );
};

export default LiquidatePositionPage;
