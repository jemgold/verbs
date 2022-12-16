import { useState } from "react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import globalStyles from "~/styles/app.css";
import rainbowStyles from "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { Chain } from "wagmi";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

type Env = { ALCHEMY_API_KEY?: string; PUBLIC_ENABLE_TESTNETS?: string };

type LoaderData = { ENV: Env };

export const loader: LoaderFunction = () => {
  const data: LoaderData = {
    ENV: {
      ALCHEMY_API_KEY:
        process.env.ALCHEMY_ID || "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
      PUBLIC_ENABLE_TESTNETS: process.env.PUBLIC_ENABLE_TESTNETS || "false",
    },
  };

  return json(data);
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Verbs",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: rainbowStyles },
  ];
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  const [{ client, chains }] = useState(() => {
    const testChains = ENV.PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : [];

    const { chains, provider } = configureChains(
      [mainnet, ...testChains],
      [alchemyProvider({ apiKey: ENV.ALCHEMY_API_KEY }), publicProvider()],
    );

    const { connectors } = getDefaultWallets({
      appName: "Verbs",
      chains,
    });

    const client = createClient({
      autoConnect: true,
      connectors,
      provider,
    });

    return {
      client,
      chains,
    };
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {client && chains ? (
          <WagmiConfig client={client}>
            <RainbowKitProvider chains={chains as Chain[]}>
              <Outlet />
            </RainbowKitProvider>
          </WagmiConfig>
        ) : null}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
