import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/abis/index.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "../contracts",
      include: ["Anchor*.json"],
    }),
    react(),
  ],
});
