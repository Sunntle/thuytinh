import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home/home.jsx";
import Order from "../pages/Order/order.jsx";
import Menu from "../pages/Menu/menu.jsx";
import Layout from "../layouts/index.jsx";
import Rate from "../pages/Rating/rate.jsx";
import Service from "../pages/Service/Service.jsx";
import EnterName from "../pages/EnterName/EnterName.jsx";
import PageNotFound from "../pages/PageNotFound/pagenotfound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <EnterName />,
      },
      {
        path: "home",
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
            <Rate/>
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
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default router;
