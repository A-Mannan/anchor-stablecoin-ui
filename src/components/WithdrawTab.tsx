import React, { useState, useEffect } from "react";
import LabeledNumberInput from "./LabeledNumberInput";
import AnimatedButton from "./AnimatedButton";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { useUserPosition } from "../hooks/useUserPosition";
import { useWithdraw } from "../hooks/useWithdraw";
import {
  calculateCollateralRatio,
  INFINITY_BIGINT,
} from "../utils/collateralRatio";
import { formatUnits, parseUnits } from "viem";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import StatsDisplay from "./StatsDisplay";

const WithdrawTab: React.FC<{}> = () => {
  const [withdrawAmount, setWithdrawAmount] = useState<string | "">("");
  const [debouncedWithdrawAmount] = useDebounce(withdrawAmount, 500);

  const [isExecuting, setIsExecuting] = useState(false);

  const { ethPriceInUsd } = useEthPriceInUsd();
  const { debtAmount, collateralAmount, fetchUserPosition } = useUserPosition();

  const { withdraw } = useWithdraw();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset inputs after the transaction is executed
    if (!isExecuting) {
      setWithdrawAmount("");
    }
  }, [isExecuting]);

  const handleWithdrawChange = (value: string) => {
    setWithdrawAmount(value);
    if (error) setError(null)
  };

  const newCollateralAmount =
    (collateralAmount || 0n) - parseUnits(debouncedWithdrawAmount || "0", 18);

  // Calculate the collateral ratios
  const collateralRatioBefore = calculateCollateralRatio(
    collateralAmount || 0n,
    debtAmount || 0n,
    ethPriceInUsd
  );

  const collateralRatioAfter = calculateCollateralRatio(
    newCollateralAmount || 0n,
    debtAmount || 0n,
    ethPriceInUsd
  );

  const handleWithdraw = async () => {
    const withdrawAmountInUnits = parseUnits(
      debouncedWithdrawAmount || "0",
      18
    );

    if (!withdrawAmountInUnits) {
      setError("Withdraw amount cannot be zero.");
      return;
    }

    if (!collateralAmount || collateralAmount < withdrawAmountInUnits) {
      setError("Insufficient collateral to withdraw");
      return;
    }

    if (collateralRatioAfter < parseUnits("160", 18)) {
      setError("The new collateral ratio is lower than the Min Coll Ratio.");
      return;
    }

    setIsExecuting(true);
    try {
      await withdraw(withdrawAmountInUnits);
      await fetchUserPosition();
      toast.success("Withdraw successful", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Withdraw transaction failed:", err);
      toast.error("Withdraw transaction failed", {
        position: "top-center",
      });
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
    },
    {
      label: "Collateral",
      value: formatUnits(collateralAmount || 0n, 18),
      newValue: formatUnits(newCollateralAmount, 18),
      deltaColor: "text-red-500",
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
      deltaColor: "text-red-500",
      displayChange: collateralRatioBefore !== collateralRatioAfter,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col justify-around gap-5 h-4/6 m-5 p-5">
        <LabeledNumberInput
          value={withdrawAmount}
          setValue={handleWithdrawChange}
          description="Withdraw ETH"
          id="withdraw"
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
          <AnimatedButton onClick={handleWithdraw} isDisabled={isExecuting}>
            Withdraw
          </AnimatedButton>
        </div>
      </div>
      <StatsDisplay stats={stats} />
    </div>
  );
};

export default WithdrawTab;
