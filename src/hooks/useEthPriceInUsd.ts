import { useEffect} from "react";
import { useReadAnchorEngineFetchEthPriceInUsd } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useWatchBlockNumber } from "wagmi";

interface UseEthPriceInUsdReturnType {
  ethPriceInUsd: bigint | undefined;
}

export const useEthPriceInUsd = (): UseEthPriceInUsdReturnType => {
  const { anchorEngineAddress } = useContractAddress();

  const { data: ethPriceInUsd, refetch } = useReadAnchorEngineFetchEthPriceInUsd({
    address: anchorEngineAddress,
  });

  // Function to fetch and update ETH price
  const fetchEthPriceInUsd = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  // Initial fetch and subsequent updates when the address changes
  useEffect(() => {
    if (anchorEngineAddress) {
      fetchEthPriceInUsd();
    }
  }, [anchorEngineAddress, refetch]);

  // Refetch data whenever the block number changes
  useWatchBlockNumber({
    onBlockNumber() {
      fetchEthPriceInUsd();
    },
  });

  return { ethPriceInUsd };
};
