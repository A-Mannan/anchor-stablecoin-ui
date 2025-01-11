import React, { useState, useEffect } from "react";
import LabeledNumberInput from "./LabeledNumberInput";
import AnimatedButton from "./AnimatedButton";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { useUserPosition } from "../hooks/useUserPosition";
import { useRepay } from "../hooks/useRepay";
import { useUserBalance } from "../hooks/useUserBalance";
import {
  calculateCollateralRatio,
  INFINITY_BIGINT,
} from "../utils/collateralRatio";
import { formatUnits, parseUnits } from "viem";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import StatsDisplay from "./StatsDisplay";
import { formatNumber } from "../utils/formatNumber";
import ErrorDisplay from "./ErrorDisplay";
import { useAccount } from "wagmi";

const RepayTab: React.FC<{}> = () => {
  const [repayAmount, setRepayAmount] = useState<string | "">("");

  const [debouncedRepayAmount] = useDebounce(repayAmount, 500);

  const [isExecuting, setIsExecuting] = useState(false);

  const { ethPriceInUsd } = useEthPriceInUsd();
  const { address } = useAccount();
  const { debtAmount, collateralAmount, fetchUserPosition } = useUserPosition(address!);
  const { anchorUsdBalance, fetchAnchorUsdBalance } = useUserBalance();

  const { repay } = useRepay();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset inputs after the transaction is executed
    if (!isExecuting) {
      setRepayAmount("");
    }
  }, [isExecuting]);

  const handleRepayChange = (value: string) => {
    setRepayAmount(value);
    if (error) setError(null);
  };

  const newDebtAmount =
    (debtAmount || 0n) - parseUnits(debouncedRepayAmount || "0", 18);

  // Calculate the collateral ratios
  const collateralRatioBefore = calculateCollateralRatio(
    collateralAmount || 0n,
    debtAmount || 0n,
    ethPriceInUsd
  );

  const collateralRatioAfter = calculateCollateralRatio(
    collateralAmount || 0n,
    newDebtAmount,
    ethPriceInUsd
  );

  const handleRepay = async () => {
    const repayAmountInUnits = parseUnits(debouncedRepayAmount || "0", 18);

    if (!repayAmountInUnits) {
      setError("Repay amount cannot be zero.");
      return;
    }

    if (repayAmountInUnits > (debtAmount || 0n)) {
      setError("Cannot repay more than debt");
      return;
    }

    fetchAnchorUsdBalance();

    if ((anchorUsdBalance as bigint) < repayAmountInUnits) {
      setError("Insufficient AnchorUSD Balance");
      return;
    }

    setIsExecuting(true);
    try {
      await repay(repayAmountInUnits);
      await fetchUserPosition();
      toast.success("Repay successful", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Repay transaction failed:", err);
      toast.error("Repay transaction failed", {
        position: "top-center",
      });
    }
    setIsExecuting(false);
  };

  const stats = [
    {
      label: "Price of ETH in USD",
      value: `$${formatUnits(ethPriceInUsd || 0n, 18)}`,
    },
    {
      label: "Debt",
      value: `$${formatUnits(debtAmount || 0n, 18)}`,
      newValue: `$${formatUnits(newDebtAmount, 18)}`,
      deltaColor: "text-red-500",
      displayChange: (debtAmount || 0n) !== newDebtAmount,
    },
    {
      label: "Collateral",
      value: `${formatUnits(collateralAmount || 0n, 18)} ETH`,
    },
    {
      label: "Collateral Ratio",
      value:
        collateralRatioBefore === INFINITY_BIGINT
          ? "∞"
          : `${formatNumber(formatUnits(collateralRatioBefore, 18))}%`,
      newValue:
        collateralRatioAfter === INFINITY_BIGINT
          ? "∞"
          : `${formatNumber(formatUnits(collateralRatioAfter, 18))}%`,
      deltaColor: "text-green-500",
      displayChange: collateralRatioBefore !== collateralRatioAfter,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col justify-around gap-5 h-4/6 m-5 p-5">
        <LabeledNumberInput
          value={repayAmount}
          setValue={handleRepayChange}
          description="Repay AnchorUSD"
          id="repay"
          isDisabled={isExecuting}
        />
        <ErrorDisplay error={error} />
        <div className="flex">
          <AnimatedButton onClick={handleRepay} isDisabled={isExecuting}>
            Repay
          </AnimatedButton>
        </div>
      </div>
      <StatsDisplay stats={stats} />
    </div>
  );
};

export default RepayTab;
