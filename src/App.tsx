import './App.css'
import Navbar from './components/navbar/Navbar';

import { StarknetProvider } from "./components/starknet-provider";

export function App() {
  return (
    <StarknetProvider>
      <Navbar />
    </StarknetProvider>
  );
}

export default App
