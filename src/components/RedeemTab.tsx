import React, { useEffect, useState } from "react";
import LabeledNumberInput from "./LabeledNumberInput";
import AnimatedButton from "./AnimatedButton";
import StatsDisplay from "./StatsDisplay";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { formatUnits, parseUnits } from "viem";
import { useDebounce } from "use-debounce";
import { useBatchRedeem } from "../hooks/useBatchRedeem";
import { gql, useQuery } from "urql";
import { RedemptionProvider } from "../types";
import { calculateRedemptionFees } from "../utils/redemptionFees";

// GraphQL query to fetch borrower data
const REDEMPTION_PROVIDERS_QUERY = gql`
  query {
    borrowers(
      where: { isRedemptionProvider: true }
      orderBy: redemptionFeeRate
    ) {
      id
      redemptionFeeRate
      redemptionAmount
    }
  }
`;

const RedeemTab: React.FC = () => {
  const [redeemAmount, setRedeemAmount] = useState<string | "">("");
  const [debouncedRedeemAmount] = useDebounce(redeemAmount, 500);
  const [isExecuting, setIsExecuting] = useState(false);

  const [slippage, setSlippage] = useState<number>(0);
  const [slippageInput, setSlippageInput] = useState<string>("0");
  const [error, setError] = useState<string | null>(null);

  const { ethPriceInUsd } = useEthPriceInUsd();
  const { redeem } = useBatchRedeem();

  const [{ data, fetching, error: queryError }] = useQuery({
    query: REDEMPTION_PROVIDERS_QUERY,
  });

  useEffect(() => {
    // Reset inputs after the transaction is executed
    if (!isExecuting) {
      setRedeemAmount("");
    }
  }, [isExecuting]);

  const handleRedeemChange = (value: string) => {
    setRedeemAmount(value);
    if (error) setError(null);
  };

  const handleSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Validate input to allow only numbers, decimal points, and empty values
    if (inputValue === "" || /^-?\d*\.?\d*$/.test(inputValue)) {
      setSlippageInput(inputValue); // Update raw input state

      // Parse input to a number and update slippage if valid
      const parsedValue = parseFloat(inputValue);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
        setSlippage(parsedValue);
      }
    }
  };

  const handleSliderChange = (value: number) => {
    setSlippage(value);
    setSlippageInput(value.toString()); // Keep raw input in sync with slider
  };

  const handlePresetClick = (preset: number) => {
    setSlippage(preset);
    setSlippageInput(preset.toString()); // Update raw input for the selected preset
  };

  // Calculate total redemption amount
  const totalRedemptionAmount = data?.borrowers
    ?.map((borrower: RedemptionProvider) => BigInt(borrower.redemptionAmount))
    .reduce((sum: bigint, amount: bigint) => sum + amount, 0n);

  const redeemAmountInUnits = parseUnits(debouncedRedeemAmount || "0", 18);

  const { totalFeePaid, averageFeeRate } = redeemAmountInUnits && data?.borrowers
    ? calculateRedemptionFees(data?.borrowers, redeemAmountInUnits)
    : { totalFeePaid: 0n, averageFeeRate: 0n };

  const stats = [
    {
      label: "Price of ETH in USD",
      value: formatUnits(ethPriceInUsd || 0n, 18),
    },
    {
      label: "Total Redemption Amount",
      value: formatUnits(totalRedemptionAmount || 0n, 18),
    },
    {
      label: "Expected Fee",
      value: `${formatUnits(totalFeePaid, 18)} (${formatUnits(averageFeeRate, 2)} %)`,
    },
    {
      label: "Ether out",
      value: formatUnits(ethPriceInUsd || 0n, 18),
    },
  ];

  const handleRedeem = async () => {
    const redeemAmountInUnits = parseUnits(debouncedRedeemAmount || "0", 18);

    if (!redeemAmountInUnits) {
      setError("Redeem amount cannot be zero.");
      return;
    }

    // Handle the redeem logic here
  };

  return (
    <div className="flex flex-col h-full">
      {/* Redeem Input */}
      <div className="flex flex-col justify-between h-4/6 mx-5 mt-5 p-5 gap-4">
        <LabeledNumberInput
          value={redeemAmount}
          setValue={handleRedeemChange}
          description="Redeem AnchorUSD"
          id="redeem"
        />

        {/* Slippage Section */}
        <div className="flex flex-col border border-accent rounded-md py-3 px-4 relative sm:w-11/12 mx-auto gap-1">
          <span className="text-xs text-accent absolute -top-2 bg-secondary px-2">
            Slippage Tolerance
          </span>

          {/* Slider and Input */}
          <div className="flex items-center gap-4">
            {/* Slider */}
            <input
              type="range"
              min={0}
              max={100}
              step={0.01} // Allows decimal values
              value={slippage}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-1 cursor-pointer"
            />

            {/* Input Field */}
            <input
              type="text"
              value={slippageInput} // Use raw input value
              onChange={handleSlippageChange}
              className="w-14 p-1 border border-accent rounded-md text-center text-accent bg-secondary focus:outline-none"
            />
            <span className="text-lg text-accent">%</span>
          </div>

          {/* Preset Buttons */}
          <div className="flex gap-2">
            {[0, 25, 50, 75, 100].map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`rounded-md text-xs w-14 h-7 flex justify-center items-center ${
                  slippage === preset
                    ? "bg-accent text-primary"
                    : "bg-primary text-accent"
                } transition-all duration-200`}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>

        <div
          className={`p-4 text-xs rounded-lg bg-primary border border-red-500 text-red-500 h-8 w-11/12 mx-auto flex items-center justify-center ${error ? "" : "invisible"}`}
          role="alert"
        >
          {error}
        </div>

        <div className="flex">
          <AnimatedButton onClick={handleRedeem}>Redeem</AnimatedButton>
        </div>
      </div>
      <div>
        <StatsDisplay stats={stats} />
      </div>
    </div>
  );
};

export default RedeemTab;