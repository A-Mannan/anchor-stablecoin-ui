import React, { useState, useEffect } from "react";
import LabeledNumberInput from "./LabeledNumberInput";
import AnimatedButton from "./AnimatedButton";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { useUserPosition } from "../hooks/useUserPosition";
import { useDepositAndMint } from "../hooks/useDepositAndMint";
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
  const [error, setError] = useState<string | null>(null);

  const { ethPriceInUsd } = useEthPriceInUsd();
  const { debtAmount, collateralAmount, fetchUserPosition } = useUserPosition();

  const { depositAndMint } = useDepositAndMint();

  const handleDepositChange = (value: string) => {
    setDepositAmount(value);
    if (error) setError(null);
  };

  const handleMintChange = (value: string) => {
    setMintAmount(value);
    if (error) setError(null);
  };


  useEffect(() => {
    if (!isExecuting) {
      setDepositAmount("");
      setMintAmount("");
    }
  }, [isExecuting]);

  // Utility function for parsing and validation
  const parseAndValidateAmount = (amount: string): bigint | null => {
    try {
      const parsedAmount = parseUnits(amount || "0", 18);
      if (parsedAmount === 0n) {
        return null; // Returning null if the amount is zero
      }
      return parsedAmount;
    } catch (error) {
      setError("Invalid input. Please enter a valid number.");
      return null;
    }
  };

  const handleMintAndDeposit = async () => {
    const depositAmountInUnits = parseAndValidateAmount(debouncedDepositAmount);
    const mintAmountInUnits = parseAndValidateAmount(debouncedMintAmount);

    if (!depositAmountInUnits && !mintAmountInUnits) {
      setError("Both deposit and mint amounts cannot be zero.");
      return;
    }

    setIsExecuting(true);
    setError(null); // Clear any existing error
    try {
      await depositAndMint(depositAmountInUnits || 0n, mintAmountInUnits || 0n);
      await fetchUserPosition();
      toast.success("Mint and deposit successful", { position: "top-center" });
    } catch (err) {
      console.error("Mint and Deposit transaction failed:", err);
      toast.error("Mint and Deposit transaction failed", {
        position: "top-center",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Calculate after-values
  const newDebtAmount =
    debtAmount && parseAndValidateAmount(debouncedMintAmount)
      ? debtAmount + parseAndValidateAmount(debouncedMintAmount)!
      : debtAmount;

  const newCollateralAmount =
    collateralAmount && parseAndValidateAmount(debouncedDepositAmount)
      ? collateralAmount + parseAndValidateAmount(debouncedDepositAmount)!
      : collateralAmount;

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
          description="Mint xUSD"
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
            {isExecuting ? <Loader /> : "Mint"}
          </AnimatedButton>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-2/6 bg-slate-600 border-t-2 border-gray-700 text-sm">
        <div>
          <span>
            Price of ETH in USD:{" "}
            {ethPriceInUsd ? formatUnits(ethPriceInUsd, 18) : "0"}
          </span>
        </div>
        <div>
          <span>Debt: {debtAmount ? formatUnits(debtAmount, 18) : "0"}</span>
          {debouncedMintAmount && (
            <>
              <span className="mx-2">→</span>
              <span className="text-red-500">
                {formatUnits(newDebtAmount || 0n, 18)}
              </span>
            </>
          )}
        </div>
        <div>
          <span>
            Collateral:{" "}
            {collateralAmount ? formatUnits(collateralAmount, 18) : "0"}
          </span>
          {debouncedDepositAmount && (
            <>
              <span className="mx-2">→</span>
              <span className="text-green-500">
                {formatUnits(newCollateralAmount || 0n, 18)}
              </span>
            </>
          )}
        </div>
        <div>
          <span>
            Collateral Ratio:{" "}
            {collateralRatioBefore === INFINITY_BIGINT
              ? "∞"
              : formatUnits(collateralRatioBefore, 18) + "%"}
          </span>
          {(debouncedDepositAmount || debouncedMintAmount) && (
            <>
              <span className="mx-2">→</span>
              <span
                className={
                  collateralRatioAfter < collateralRatioBefore
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {collateralRatioAfter === INFINITY_BIGINT
                  ? "∞"
                  : formatUnits(collateralRatioAfter, 18) + "%"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositAndMintTab;

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg
        aria-hidden="true"
        className="w-7 h-7 animate-spin text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};
