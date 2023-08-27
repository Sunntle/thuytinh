import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../Layout";
import DashBoard from "../pages/DashBoard";
import MenuPage from "../pages/menu";
import OrderPage from "../pages/Order";
import ProductPage from "../pages/product";
import MaterialPage from "../pages/material";
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
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "material",
        element: <MaterialPage />,
      },
    ],
  },
]);
export default router;
