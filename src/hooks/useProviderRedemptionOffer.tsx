import { useEffect } from "react";
import { useReadAnchorEngineRedemptionOffers } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import type { Address } from "viem";

interface UseProviderRedemptionOfferReturnType {
  redemptionAmount: bigint | undefined;
  feeRate: bigint | undefined;
  fetchProviderRedemptionOffer: () => Promise<void>;
}

export const useProviderRedemptionOffer =
  (): UseProviderRedemptionOfferReturnType => {
    const { anchorEngineAddress } = useContractAddress();
    const { address } = useAccount();

    const { data: redemptionOffer, refetch } =
      useReadAnchorEngineRedemptionOffers({
        address: anchorEngineAddress,
        args: [address as Address],
      });

    const fetchProviderRedemptionOffer = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("Error fetching provider redemption offer:", error);
      }
    };

    // Initial fetch when the address or anchorEngineAddress changes
    useEffect(() => {
      if (anchorEngineAddress && address) {
        fetchProviderRedemptionOffer();
      }
    }, [anchorEngineAddress, address, refetch]);

    return {
      redemptionAmount: redemptionOffer ? redemptionOffer[1] : undefined,
      feeRate: redemptionOffer ? redemptionOffer[0] : undefined,
      fetchProviderRedemptionOffer,
    };
  };
