import './App.css'
import Navbar from './components/navbar/Navbar';

import { RouterProvider } from 'react-router-dom';
import { StarknetProvider } from "./components/starknet-provider";
import { router } from './utils/routes';
import Footer from './components/footer/footer';
import { Box } from '@radix-ui/themes';

export function App() {
  return (
    <StarknetProvider>
      <Box maxWidth={"1280px"} mx={"auto"}>
        <Navbar />
        <Box minHeight={"80vh"}>
          <RouterProvider router={router} />
        </Box>
        <Footer />
      </Box>
    </StarknetProvider>
  );
}

export default App
