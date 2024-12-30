import type { Address } from "viem";

interface NetworkAddress {
  anchorEngineAddress: Address;
  anchorUSDAddress: Address;
  stETHAddress: Address;
}

interface NetworkAddresses {
  [chainId: number]: NetworkAddress;
}

// Type for data returned from the subgraph
interface RedemptionProvider {
  id: string;
  redemptionFeeRate: string;
  redemptionAmount: string;
}


export type { NetworkAddresses , NetworkAddress, RedemptionProvider};
