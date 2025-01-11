import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabeledNumberInput from "../components/LabeledNumberInput";
import AnimatedButton from "../components/AnimatedButton";
import { formatUnits, parseUnits } from "viem";
import StatsDisplay from "../components/StatsDisplay";
import ErrorDisplay from "../components/ErrorDisplay";
import { useContractAddress } from "../hooks/useContractAddress";
import { useReadAnchorEngineMaxRedemptionFeeRate } from "../abis";
import { useUserPosition } from "../hooks/useUserPosition";
import { useProviderRedemptionOffer } from "../hooks/useProviderRedemptionOffer";
import { useDebounce } from "use-debounce";
import { useRedemptionOfferRegistration } from "../hooks/useRedemptionOfferRegistration";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const ManageRedemptionPage: React.FC = () => {
  const [newRedemptionAmount, setNewRedemptionAmount] = useState<string>("");
  const [debouncedNewRedemptionAmount] = useDebounce(newRedemptionAmount, 500);

  const [newFeeRate, setNewFeeRate] = useState<string>("");
  const [debouncedNewFeeRate] = useDebounce(newFeeRate, 500);

  const [isExecuting, setIsExecuting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook to navigate between pages
  const { anchorEngineAddress } = useContractAddress();
  const { data: maxRedemptionFeeRate } =
    useReadAnchorEngineMaxRedemptionFeeRate({
      address: anchorEngineAddress,
    });
    const { address } = useAccount();
  const { debtAmount } = useUserPosition(address!);
  const { redemptionAmount, feeRate, fetchProviderRedemptionOffer } =
    useProviderRedemptionOffer();

  const { registerRedemptionProvider, unregisterRedemptionProvider } =
    useRedemptionOfferRegistration();

  const stats = [
    {
      label: "Provider Debt",
      value: `$${formatUnits(debtAmount || 0n, 18)}`,
    },
    {
      label: "Max Redemption Fee Rate",
      value: `${formatUnits(maxRedemptionFeeRate || 0n, 2)}%`,
    },
    {
      label: "Redemption Amount",
      value: `$${formatUnits(redemptionAmount || 0n, 18)}`,
      newValue: `$${debouncedNewRedemptionAmount}`,
      displayChange:
        debouncedNewRedemptionAmount !== "" &&
        parseUnits(debouncedNewRedemptionAmount, 18) !== redemptionAmount,
    },
    {
      label: "Redemption Fee Rate",
      value: `${formatUnits(feeRate || 0n, 2)}%`,
      newValue: `${debouncedNewFeeRate}%`,
      displayChange:
        debouncedNewFeeRate !== "" &&
        parseUnits(debouncedNewFeeRate, 2) !== feeRate,
    },
  ];

  const handleNewRedemptionAmountChange = (value: string) => {
    setNewRedemptionAmount(value);
    if (error) setError(null);
  };

  const handleNewFeeRateChange = (value: string) => {
    setNewFeeRate(value);
    if (error) setError(null);
  };

  const handleRegisterRedemption = async () => {
    const newRedemptionAmountInUnits = parseUnits(
      debouncedNewRedemptionAmount || "0",
      18
    );
    const newFeeRateInBps = parseUnits(debouncedNewFeeRate || "0", 2);

    if (!newRedemptionAmountInUnits || !newFeeRateInBps) {
      setError("Redemption amount and fee rate cannot be zero.");
      return;
    }

    if (newRedemptionAmountInUnits > (debtAmount || 0n)) {
      setError("Cannot provide more than debt");
      return;
    }

    if (newFeeRateInBps > (maxRedemptionFeeRate || 0n)) {
      setError("fee rate cannot be more than max fee rate");
      return;
    }

    setIsExecuting(true);
    try {
      await registerRedemptionProvider(
        newFeeRateInBps,
        newRedemptionAmountInUnits
      );
      await fetchProviderRedemptionOffer();
      toast.success("Provider Registration successful", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Provider Registration failed:", err);
      toast.error("Provider Registration failed", {
        position: "top-center",
      });
    }
    setIsExecuting(false);
  };

  const handleUnRegisterRedemption = async () => {
    setIsExecuting(true);
    try {
      await unregisterRedemptionProvider();
      await fetchProviderRedemptionOffer();
      toast.success("Provider Unregistered successfully", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Provider Unregistration failed:", err);
      toast.error("Provider Unregistration failed", {
        position: "top-center",
      });
    }
    setIsExecuting(false);
  };

  useEffect(() => {
    // Reset inputs after the transaction is executed
    if (!isExecuting) {
      setNewRedemptionAmount("");
      setNewFeeRate("");
    }
  }, [isExecuting]);

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
            Manage Redemption
          </h2>

          {/* Input Fields */}
          <LabeledNumberInput
            value={newRedemptionAmount}
            setValue={handleNewRedemptionAmountChange}
            description="Redemption Amount"
            id="redemption-amount"
            isDisabled={isExecuting}
          />

          <LabeledNumberInput
            value={newFeeRate}
            setValue={handleNewFeeRateChange}
            description="Fee Rate"
            id="fee-rate"
            isDisabled={isExecuting}
          />

          <ErrorDisplay error={error}></ErrorDisplay>

          {/* Button */}
          <div className="flex gap-4 w-3/4">
            {feeRate !== 0n && (
              <AnimatedButton onClick={handleUnRegisterRedemption}>
                Unregister
              </AnimatedButton>
            )}
            <AnimatedButton onClick={handleRegisterRedemption}>
              Register
            </AnimatedButton>
          </div>
        </div>
        <StatsDisplay stats={stats}></StatsDisplay>
      </div>
    </div>
  );
};

export default ManageRedemptionPage;
