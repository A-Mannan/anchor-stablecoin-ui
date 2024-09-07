import { useCallback } from "react";
import { useWriteAnchorEngineWithdraw } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseWithdrawReturnType {
  withdraw: (withdrawAmount: bigint) => Promise<void>;
}

export const useWithdraw = (): UseWithdrawReturnType => {
  const { anchorEngineAddress } = useContractAddress();
  const { address } = useAccount();

  const { writeContractAsync: writeWithdraw } = useWriteAnchorEngineWithdraw(
    {}
  );

  const withdraw = useCallback(
    async (withdrawAmount: bigint) => {
      const txHash = await writeWithdraw({
        address: anchorEngineAddress,
        args: [address as Address, withdrawAmount],
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
    withdraw,
  };
};
