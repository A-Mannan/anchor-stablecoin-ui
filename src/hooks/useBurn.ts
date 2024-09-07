import { useCallback } from "react";
import { useWriteAnchorEngineBurn } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseBurnReturnType {
  burn: (repayAmount: bigint) => Promise<void>;
}

export const useBurn = (): UseBurnReturnType => {
  const { anchorEngineAddress } = useContractAddress();
  const { address } = useAccount();

  const { writeContractAsync: writeBurn } = useWriteAnchorEngineBurn({});

  const burn = useCallback(
    async (repayAmount: bigint) => {
      const txHash = await writeBurn({
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
    burn,
  };
};
