import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../Layout/admin";
import LayoutEmployee from '../Layout/employee';

import DashBoard from "../pages/DashBoard";
import MenuPage from "../pages/menu";
import OrderPage from "../pages/Order";
import ProductPage from "../pages/product";
import MaterialPage from "../pages/material";
import CategoryPage from "../pages/category";
import ReviewsPage from "../pages/reviews";
import LoginPage from "../pages/login";
import HomeEmployeePage from "../pages/employee/home";
import RoleRoute from "../guard/admin";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <RoleRoute role={['R4']} > <LayoutAdmin /></RoleRoute>,
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
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/employee",
    element: <RoleRoute role={['R2', 'R3', 'R4']}><LayoutEmployee /></RoleRoute>,
    children: [
      {
        index: true,
        element: <HomeEmployeePage />,
      },
    ]
  },
]);
export default router;
