import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../Layout/admin";
import DashBoard from "../pages/DashBoard";
import MenuPage from "../pages/menu";
import OrderPage from "../pages/Order";
import ProductPage from "../pages/product";
import MaterialPage from "../pages/material";
import CategoryPage from "../pages/category";
import ReviewsPage from "../pages/reviews";
import LoginPage from "../pages/login";
import RoleRoute from "../guard/admin";
import ResMenu from "../pages/restaurant/menu/res-menu";
import ResChooseTable from "../pages/restaurant/choosetable/res-choosetable";
import ResRevenue from "../pages/restaurant/revenue/res-revenue";
import RecipePage from "../pages/recipes";
import RegisterPage from "../pages/register";
import SearchPage from "../pages/search";
import UserPage from "../pages/user";
import TablePage from "../pages/table";
import ResSelectTable from "../pages/restaurant/choosetable/res-selectTable";
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
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "table",
        element: <TablePage />,
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
    path: "/employee",
    element: (
      <RoleRoute role={["R2", "R3", "R4"]}>
        <LayoutAdmin />
      </RoleRoute>
    ),
    children: [
      {
        index: true,
        element: <ResMenu />,
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
        path: "select-table/:id/:idOrder",
        element: <ResSelectTable />,
      },
      {
        path: "renvenue",
        element: <ResRevenue />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);
export default router;
