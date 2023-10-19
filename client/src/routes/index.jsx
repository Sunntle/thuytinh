import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home/home.jsx";
import Order from "../pages/Order/order.jsx";
import Menu from "../pages/Menu/menu.jsx";
import Layout from "../layouts/index.jsx";
import Rate from "../pages/Rating/Rating.jsx";
import Service from "../pages/Service/Service.jsx";
import EnterName from "../pages/EnterName/EnterName.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";
import Contact from "../pages/Contact/Contact.jsx";

import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import ThanksPage from "../pages/ThanksPage/ThanksPage.jsx";

const router = createBrowserRouter([
  {
    path: "/:alias",
    element:<Layout/>,
    children: [
      {
        index: true,
        element: <EnterName />,
      },
      {
        path: "home",
        element: (
            <Home />
        ),
      },
      {
        path: "service",
        element: (
            <Service />
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "order",
        element: (
            <Order />
        ),
      },
      {
        path: "menu",
        element: (
            <Menu />
        ),
      },
      {
        path: "rating",
        element: (
            <Rate/>
        ),
      },
      {
        path: "about",
        element: (
            <AboutUs />
        ),
      },
      {
        path: "contact",
        element: (
            <Contact />
        ),
      },
      {
        path: "thankyou",
        element: (<ThanksPage />)
      }
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default router;
