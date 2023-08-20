import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../Layout";
import DashBoard from "../pages/DashBoard";
import MenuPage from "../pages/menu/menu";
import OrderPage from "../pages/Order";

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
      {
        path: "order",
        element: <OrderPage />,
      },
    ],
  },
]);
export default router;
