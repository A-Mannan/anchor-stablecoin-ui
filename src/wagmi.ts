import { http, createConfig } from "@wagmi/core";
import { holesky, sepolia, anvil } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [holesky, sepolia, anvil],
  transports: {
    [holesky.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http(),
  },
});
