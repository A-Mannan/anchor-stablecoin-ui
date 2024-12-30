import { useCallback } from "react";
import { useWriteAnchorEngineRepay } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseRepayReturnType {
  repay: (repayAmount: bigint) => Promise<void>;
}

export const useRepay = (): UseRepayReturnType => {
  const { anchorEngineAddress } = useContractAddress();
  const { address } = useAccount();

  const { writeContractAsync: writeRepay } = useWriteAnchorEngineRepay({});

  const repay = useCallback(
    async (repayAmount: bigint) => {
      const txHash = await writeRepay({
        address: anchorEngineAddress,
        args: [address as Address, repayAmount],
      });
      console.log("Tx hash: ", txHash);
      const txReceipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      console.log("Tx receipt: ", txReceipt);
    },
    [anchorEngineAddress, address]
  );

  return {
    repay,
  };
};
