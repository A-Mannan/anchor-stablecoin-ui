import { useEffect } from "react";
import {
  useReadAnchorEngineUserPositions,
  useWatchAnchorEngineDepositEtherEvent,
  useWatchAnchorEngineMintEvent,
  useWatchAnchorEngineBurnEvent,
  useWatchAnchorEngineWithdrawEtherEvent,
} from "../abis";
import { useContractAddress } from "./useContractAddress";
import { useAccount } from "wagmi";
import type { Address } from "viem";

interface UseUserPositionReturnType {
  debtAmount: bigint | undefined;
  collateralAmount: bigint | undefined;
  fetchUserPosition: () => Promise<void>;
}

export const useUserPosition = (): UseUserPositionReturnType => {
  const { anchorEngineAddress } = useContractAddress();
  const { address } = useAccount();

  const { data: userPosition, refetch } = useReadAnchorEngineUserPositions({
    address: anchorEngineAddress,
    args: [address as Address],
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
    if (anchorEngineAddress && address) {
      fetchUserPosition();
    }
  }, [anchorEngineAddress, address, refetch]);

  // Event listeners for contract events to update user position
  // useWatchAnchorEngineDepositEtherEvent({
  //   address: anchorEngineAddress,
  //   args: {
  //     onBehalfOf: address as Address,
  //   },
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
