import './App.css'

import { RouterProvider } from 'react-router-dom';
import { router } from './utils/routes';

export function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App
