import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { setup } from "./dojo/generated/setup.ts";
import { DojoProvider } from "./dojo/DojoContext.tsx";
import { dojoConfig } from "../dojoConfig.js";
import { Spinner } from "@radix-ui/themes";

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css'
import "@fontsource/permanent-marker/400.css"; 



async function init() {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("React root not found");
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  const setupResult = await setup(dojoConfig);
  const client = new ApolloClient({
    uri: `${setupResult.config.toriiUrl}/graphql}`,
    cache: new InMemoryCache(),
  });

  !setupResult && <Spinner />;

  root.render(
    <React.StrictMode>
      <DojoProvider value={setupResult}>
        <ApolloProvider client={client}>
          <Theme accentColor='orange' hasBackground={false}>
            <App />
          </Theme>
        </ApolloProvider>
      </DojoProvider>
    </React.StrictMode>
  );
}

init();
