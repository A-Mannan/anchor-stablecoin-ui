import { useCallback } from "react";
import { useWriteAnchorEngineLiquidatePosition } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseLiquidatePositionReturnType {
  liquidate: (
    userToLiquidate: Address,
    debtPaymentAmount: bigint,
    minEthOut: bigint
  ) => Promise<void>;
}

export const useLiquidatePosition = (): UseLiquidatePositionReturnType => {
  const { anchorEngineAddress } = useContractAddress();
  const { address } = useAccount();

  const { writeContractAsync: writeLiquidatePosition } =
    useWriteAnchorEngineLiquidatePosition({});

  const liquidate = useCallback(
    async (
      userToLiquidate: Address,
      debtPaymentAmount: bigint,
      minEthOut: bigint
    ) => {
      const txHash = await writeLiquidatePosition({
        address: anchorEngineAddress,
        args: [
          address as Address,
          userToLiquidate,
          debtPaymentAmount,
          minEthOut,
        ],
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
    liquidate,
  };
};