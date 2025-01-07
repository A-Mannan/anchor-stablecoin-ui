import { useCallback } from "react";
import {
  useWriteAnchorEngineBecomeRedemptionProvider,
  useWriteAnchorEngineRemoveRedemptionProvider,
} from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";
import type { Address } from "viem";

interface UseRedemptionOfferRegistrationReturnType {
  registerRedemptionProvider: (
    redemptionAmount: bigint,
    feeRate: bigint
  ) => Promise<void>;
  unregisterRedemptionProvider: () => Promise<void>;
}

export const useRedemptionOfferRegistration =
  (): UseRedemptionOfferRegistrationReturnType => {
    const { anchorEngineAddress } = useContractAddress();
    const { address } = useAccount();

    const { writeContractAsync: writeBecomeRedemptionProvider } =
      useWriteAnchorEngineBecomeRedemptionProvider({});
    const { writeContractAsync: writeRemoveRedemptionProvider } =
      useWriteAnchorEngineRemoveRedemptionProvider({});

    const registerRedemptionProvider = useCallback(
      async (feeRate: bigint, redemptionAmount: bigint) => {
        const txHash = await writeBecomeRedemptionProvider({
          address: anchorEngineAddress,
          args: [feeRate, redemptionAmount],
        });
        console.log("Tx hash: ", txHash);
        const txReceipt = await waitForTransactionReceipt(config, {
          hash: txHash,
        });
        console.log("Tx receipt: ", txReceipt);
      },
      [anchorEngineAddress, address]
    );

    const unregisterRedemptionProvider = useCallback(async () => {
      const txHash = await writeRemoveRedemptionProvider({
        address: anchorEngineAddress,
        args: [],
      });
      console.log("Tx hash: ", txHash);
      const txReceipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      console.log("Tx receipt: ", txReceipt);
    }, [anchorEngineAddress, address]);

    return {
      registerRedemptionProvider,
      unregisterRedemptionProvider,
    };
  };
