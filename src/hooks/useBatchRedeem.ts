import { useCallback } from "react";
import { useWriteAnchorEngineBatchRedeemCollateral } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseBatchRedeemReturnType {
  redeem: (
    providers: Address[],
    redeemAmount: bigint,
    minEthOutAmount: bigint
  ) => Promise<void>;
}

export const useBatchRedeem = (): UseBatchRedeemReturnType => {
  const { anchorEngineAddress } = useContractAddress();

  const { writeContractAsync: writeBatchRedeem } =
    useWriteAnchorEngineBatchRedeemCollateral({});

  const redeem = useCallback(
    async (
      providers: Address[],
      redeemAmount: bigint,
      minEthOutAmount: bigint
    ) => {
      const txHash = await writeBatchRedeem({
        address: anchorEngineAddress,
        args: [providers, redeemAmount, minEthOutAmount],
      });
      console.log("Tx hash: ", txHash);
      const txReceipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      console.log("Tx receipt: ", txReceipt);
    },
    [anchorEngineAddress]
  );

  return {
    redeem,
  };
};
