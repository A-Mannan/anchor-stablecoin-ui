import { useEffect } from "react";
import { useReadAnchorEngineUserPositions } from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import type { Address } from "viem";

interface UseUserPositionReturnType {
  debtAmount: bigint | undefined;
  collateralAmount: bigint | undefined;
  fetchUserPosition: () => Promise<void>;
}

export const useUserPosition = (
  userAddress: Address
): UseUserPositionReturnType => {
  const { anchorEngineAddress } = useContractAddress();

  const { data: userPosition, refetch } = useReadAnchorEngineUserPositions({
    address: anchorEngineAddress,
    args: [userAddress as Address],
  });

  // Function to fetch user position
  const fetchUserPosition = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error fetching user position:", error);
    }
  };

  // Initial fetch when the address or anchorEngineAddress changes
  useEffect(() => {
    if (anchorEngineAddress && userAddress) {
      fetchUserPosition();
    }
  }, [anchorEngineAddress, userAddress, refetch]);

  // Event listeners for contract events to update user position
  // useWatchAnchorEngineDepositEtherEvent({
  //   address: anchorEngineAddress,
  // args: {
  //   onBehalfOf: address as Address,
  // },
  //   onLogs() {
  //     console.log("Deposit event triggered");
  //     fetchUserPosition();
  //   },
  // });

  // useWatchAnchorEngineMintEvent({
  //   address: anchorEngineAddress,
  //   args: {
  //     onBehalfOf: address as Address,
  //   },
  //   onLogs() {
  //     fetchUserPosition();
  //   },
  // });

  // useWatchAnchorEngineBurnEvent({
  //   address: anchorEngineAddress,
  //   args: {
  //     onBehalfOf: address as Address,
  //   },
  //   onLogs() {
  //     fetchUserPosition();
  //   },
  // });

  // useWatchAnchorEngineWithdrawEtherEvent({
  //   address: anchorEngineAddress,
  //   args: {
  //     onBehalfOf: address as Address,
  //   },
  //   onLogs() {
  //     fetchUserPosition();
  //   },
  // });

  return {
    debtAmount: userPosition ? userPosition[0] : undefined,
    collateralAmount: userPosition ? userPosition[1] : undefined,
    fetchUserPosition,
  };
};
