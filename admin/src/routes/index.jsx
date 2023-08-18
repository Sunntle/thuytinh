import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../Layout";
import DashBoard from "../pages/DashBoard";
import MenuPage from "../pages/menu/menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
    ],
  },
]);
export default router;
