import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LabeledNumberInput from "../components/LabeledNumberInput";
import AnimatedButton from "../components/AnimatedButton";
import { formatUnits } from "viem";
import StatsDisplay from "../components/StatsDisplay";
import ErrorDisplay from "../components/ErrorDisplay";

const LiquidatePositionPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook to navigate between pages
  const { id } = useParams<{ id: string }>();

  const stats = [
    {
      label: "Price of ETH in USD",
      value: `$${formatUnits(0n, 18)}`,
    },
    {
      label: "Harvestable StETH Yield",
      value: `${formatUnits(0n, 18)} ETH`,
    },
    {
      label: "Discount Rate",
      value: `${formatUnits(0n, 2)}%`,
    },
    {
      label: "Yield Redistribution Rate",
      value: `${formatUnits(0n, 2)}%`,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-5xl mx-auto w-full overflow-hidden">
      {/* Back Button */}
      <div className="self-start p-6">
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
            value={""}
            setValue={() => {}}
            description="Payoff Debt"
            id="payoff-debt"
            isDisabled={false}
          />

          <ErrorDisplay error={error}></ErrorDisplay>

          {/* Button */}
          <AnimatedButton>Liquidate</AnimatedButton>
        </div>
        <StatsDisplay stats={stats}></StatsDisplay>
      </div>
    </div>
  );
};

export default LiquidatePositionPage;
