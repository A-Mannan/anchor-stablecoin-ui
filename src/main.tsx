import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  midnightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import App from "./App";
import { config } from "./wagmi";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "http://127.0.0.1:8000/subgraphs/name/anchor_indexer",
  exchanges: [cacheExchange, fetchExchange],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#34B2EB",
            accentColorForeground: "#05081c",
            // borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
          coolMode
        >
          <Provider value={client}>
            <App />
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
