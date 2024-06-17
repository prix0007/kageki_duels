import {
  createBrowserRouter,
} from "react-router-dom";

// Pages
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export { router }
