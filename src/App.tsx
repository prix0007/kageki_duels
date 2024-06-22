import './App.css'

import { RouterProvider } from 'react-router-dom';
import { StarknetProvider } from "./components/starknet-provider";
import { router } from './utils/routes';

export function App() {
  return (
    <StarknetProvider>
      <RouterProvider router={router} />
    </StarknetProvider>
  );
}

export default App
