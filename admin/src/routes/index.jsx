import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../Layout/admin";
import LayoutEmployee from "../Layout/employee";

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
import ResMenu from "../pages/restaurant/menu/res-menu";
import ResChooseTable from "../pages/restaurant/choosetable/res-choosetable";
import ResRevenue from "../pages/restaurant/revenue/res-revenue";
import RecipePage from "../pages/recipes";
import RegisterPage from "../pages/register";
import SearchPage from "../pages/search";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <RoleRoute role={["R4"]}>
        {" "}
        <LayoutAdmin />
      </RoleRoute>
    ),
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
        path: "recipe",
        element: <RecipePage />,
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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/employee",
    element: (
      <RoleRoute role={["R2", "R3", "R4"]}>
        <LayoutAdmin />
      </RoleRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeEmployeePage />,
      },
      {
        path: "menu",
        element: <ResMenu />,
      },
      {
        path: "choosetable",
        element: <ResChooseTable />,
      },
      {
        path: "renvenue",
        element: <ResRevenue />,
      },
    ],
  },
]);
export default router;
