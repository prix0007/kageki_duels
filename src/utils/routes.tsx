import {
  createBrowserRouter,
} from "react-router-dom";

// Pages
import Home from "../pages/home/Home";
import Player from "../pages/player/player";
import { MainAppWrapper } from "../pages/main/main_wrapper";
import Battle from "../pages/battle/battle";

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
        path: "/battle",
        element: <Battle />
      },
      {
        path: "/player",
        element: <Player />,
      },
    ]
  },
]);

export { router }
