import type { Address } from "viem";

interface NetworkAddress {
  anchorEngineAddress: Address;
  anchorUSDAddress: Address;
  stETHAddress: Address;
}

interface NetworkAddresses {
  [chainId: number]: NetworkAddress;
}

export type { NetworkAddresses , NetworkAddress};
