import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { StarknetWalletConnectors } from '@dynamic-labs/starknet';

const Dynamic = () => (
  <DynamicContextProvider
    settings={{
      environmentId: '688bd7c5-5197-4241-91a5-e34f9ae4d6e7',
      walletConnectors: [ StarknetWalletConnectors ],
    }}>
    <DynamicWidget />
  </DynamicContextProvider>
);

export default Dynamic;
