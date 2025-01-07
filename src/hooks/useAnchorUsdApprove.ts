import { useCallback } from "react";
import { useWriteAnchorUsdApprove } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseAnchorUsdApproveReturnType {
  approve: (amount: bigint) => Promise<void>;
}

export const useAnchorUsdApprove = (): UseAnchorUsdApproveReturnType => {
  const { anchorUSDAddress, anchorEngineAddress } = useContractAddress();

  const { writeContractAsync: writeApprove } = useWriteAnchorUsdApprove({});

  const approve = useCallback(
    async (amount: bigint) => {
      const txHash = await writeApprove({
        address: anchorUSDAddress,
        args: [anchorEngineAddress as Address, amount],
      });
      console.log("Tx hash: ", txHash);
      const txReceipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      console.log("Tx receipt: ", txReceipt);
    },
    [anchorUSDAddress, anchorEngineAddress]
  );

  return {
    approve,
  };
};
