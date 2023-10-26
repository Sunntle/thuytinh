import {createBrowserRouter, Navigate} from "react-router-dom";
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
import CheckTable from "../guard/CheckTable";
import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import ThanksPage from "../pages/ThanksPage/ThanksPage.jsx";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess.jsx";
import LayoutContainer from "../layouts/LayoutContainer";
import PaymentLoading from "../pages/PaymentLoading/index.jsx";
import DeliveryNotSupported from "../pages/DeliveryNotSupported/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutContainer />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "thankyou",
        element: <ThanksPage />,
      },
    ],
  },
  {
    path: "/:alias",
    element: (
      <CheckTable>
        <EnterName>
          <Layout />
        </EnterName>
      </CheckTable>
    ),
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
         path: "menu",
         element: <Navigate to=".." />,
       },
      { index: "home", element: <Home /> },

      {
        path: "service",
        element: <Service />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "order",
        element: <Order />,
      },

      {
        path: "rating",
        element: <Rate />,
      },
    ],
  },
  { path: "/payment-loading", element: <PaymentLoading /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/url-return", element: <PaymentSuccess /> },
  { path: "/delivery-not-supported", element: <DeliveryNotSupported /> },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default router;
