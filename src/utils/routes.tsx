import {
  createBrowserRouter,
} from "react-router-dom";

// Pages
import Home from "../pages/home/Home";
import Player from "../pages/player/player";
import { MainAppWrapper } from "../pages/main/main_wrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainAppWrapper />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/player",
        element: <Player />,
      },
    ]
  },
]);

export { router }
