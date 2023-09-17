import {createBrowserRouter, useRouteError} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home/Home.jsx";
import Order from "../pages/Order/Order.jsx";
import Menu from "../pages/Menu/Menu.jsx";
import Layout from "../layouts/index.jsx";
import Rate from "../pages/Rating/Rate.jsx";
import Service from "../pages/Service/Service.jsx";
import EnterName from "../pages/EnterName/EnterName.jsx";

const ErrorBoundary = () => {
  const error = useRouteError()
  console.log(error)
  return <>{error}</>
}

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        errorElement: <ErrorBoundary />,
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: "service",
        element: (
          <Layout>
            <Service />
          </Layout>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "order",
        element: (
          <Layout>
            <Order />
          </Layout>
        ),
      },
      {
        path: "menu",
        element: (
          <Layout>
            <Menu />
          </Layout>
        ),
      },
      {
        path: "rating",
        element: (
          <Layout>
            <Rate />
          </Layout>
        ),
      },
      {
        path: "enter-name",
        element: (
          <Layout>
            <EnterName />
          </Layout>
        ),
      },
    ],
  },
]);
export default router;
