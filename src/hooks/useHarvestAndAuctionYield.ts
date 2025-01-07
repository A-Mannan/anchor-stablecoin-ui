import { useCallback } from "react";
import { useWriteAnchorEngineHarvestYieldAndAuction } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";

interface UseHarvestAndAuctionYieldReturnType {
  harvestAndAuctionYield: (buyAmount: bigint) => Promise<void>;
}

export const useHarvestAndAuctionYield =
  (): UseHarvestAndAuctionYieldReturnType => {
    const { anchorEngineAddress } = useContractAddress();
    const { address } = useAccount();

    const { writeContractAsync: writeHarvestAndAuctionYield } =
      useWriteAnchorEngineHarvestYieldAndAuction({});

    const harvestAndAuctionYield = useCallback(
      async (buyAmount: bigint) => {
        const txHash = await writeHarvestAndAuctionYield({
          address: anchorEngineAddress,
          args: [buyAmount],
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
      harvestAndAuctionYield,
    };
  };
