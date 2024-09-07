import { useEffect } from "react";
import { useReadAnchorUsdBalanceOf } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount, useBalance } from "wagmi";
import type { Address } from "viem";

interface UseUserBalanceReturnType {
  ethBalance: bigint | undefined;
  fetchEthBalance: () => Promise<void>;
  anchorUsdBalance: bigint | undefined;
  fetchAnchorUsdBalance: () => Promise<void>;
}

export const useUserBalance = (): UseUserBalanceReturnType => {
  const { anchorUSDAddress } = useContractAddress();
  const { address } = useAccount();

  const { data: ethBalance, refetch: refetchEthBalance } = useBalance({
    address: address as Address,
  });

  const { data: anchorUsdBalance, refetch: refetchAnchorUsdBalance } =
    useReadAnchorUsdBalanceOf({
      address: anchorUSDAddress,
      args: [address as Address],
    });

  const fetchEthBalance = async () => {
    try {
      await refetchEthBalance();
    } catch (error) {
      console.error("Error fetching ETH Balance:", error);
    }
  };

  const fetchAnchorUsdBalance = async () => {
    try {
      await refetchAnchorUsdBalance();
    } catch (error) {
      console.error("Error fetching AnchorUSD Balance:", error);
    }
  };

  // Initial fetch when the address or anchorEngineAddress changes
  useEffect(() => {
    if (anchorUSDAddress && address) {
      fetchAnchorUsdBalance();
    }
  }, [anchorUSDAddress, address]);

  useEffect(() => {
    if (address) {
      fetchEthBalance();
    }
  }, [address]);

  return {
    ethBalance: ethBalance?.value,
    fetchEthBalance,
    anchorUsdBalance,
    fetchAnchorUsdBalance,
  };
};
