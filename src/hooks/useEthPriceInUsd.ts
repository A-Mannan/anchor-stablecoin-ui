import { useEffect} from "react";
import { useReadAnchorEngineFetchEthPriceInUsd } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useWatchBlockNumber } from "wagmi";

interface UseEthPriceInUsdReturnType {
  ethPriceInUsd: bigint | undefined;
  refetchEthPriceInUsd: () => Promise<void>;
}

export const useEthPriceInUsd = () => {
  const { anchorEngineAddress } = useContractAddress();

  const { data: ethPriceInUsd, refetch: refetchEthPriceInUsd } = useReadAnchorEngineFetchEthPriceInUsd({
    address: anchorEngineAddress,
  });

  // Initial fetch and subsequent updates when the address changes
  useEffect(() => {
    if (anchorEngineAddress) {
      refetchEthPriceInUsd();
    }
  }, [anchorEngineAddress, refetchEthPriceInUsd]);

  // Refetch data whenever the block number changes
  useWatchBlockNumber({
    onBlockNumber() {
      refetchEthPriceInUsd();
    },
  });

  return { ethPriceInUsd, refetchEthPriceInUsd };
};
