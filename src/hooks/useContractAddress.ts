import { useChainId } from "wagmi";
import { NetworkAddress } from "../types";
import { CONTRACT_ADDRESSES } from "../constants/contracts";

export const useContractAddress = (): NetworkAddress => {
  const chainId = useChainId();
  return CONTRACT_ADDRESSES[chainId];
};
