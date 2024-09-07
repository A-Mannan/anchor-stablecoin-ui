import type { NetworkAddresses } from "../types";

const CONTRACT_ADDRESSES: NetworkAddresses = {
  // Sepolia
  11155111: {
    anchorUSDAddress: "0x1234567890abcdef1234567890abcdef12345678",
    anchorEngineAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
    stETHAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  },
  //   Holesky
  17000: {
    anchorUSDAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
    anchorEngineAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
    stETHAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  },
  // Anvil
  31337: {
    anchorUSDAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    anchorEngineAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    stETHAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  },
};

export { CONTRACT_ADDRESSES};
