import { useCallback } from "react";
import {
  useWriteAnchorEngineDepositEtherToMint,
  useWriteAnchorEngineMint,
} from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseMintAndDepositReturnType {
  depositAndMint: (depositAmount: bigint, mintAmount: bigint) => Promise<void>;
  mint: (mintAmount: bigint) => Promise<void>;
}

export const useDepositAndMint = (): UseMintAndDepositReturnType => {
  const { anchorEngineAddress } = useContractAddress();
  const { address } = useAccount();

  const { writeContractAsync: writeDepositAndMint } =
    useWriteAnchorEngineDepositEtherToMint({});
  const { writeContractAsync: writeMint } = useWriteAnchorEngineMint({});

  const depositAndMint = useCallback(
    async (depositAmount: bigint, mintAmount: bigint) => {
      const txHash = await writeDepositAndMint({
        address: anchorEngineAddress,
        args: [address as Address, mintAmount],
        value: depositAmount,
      });
      console.log("Tx hash: ", txHash);
      const txReceipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      console.log("Tx receipt: ", txReceipt);
    },
    [anchorEngineAddress, address]
  );

  const mint = useCallback(
    async (mintAmount: bigint) => {
      const txHash = await writeMint({
        address: anchorEngineAddress,
        args: [address as Address, mintAmount],
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
    depositAndMint,
    mint,
  };
};
