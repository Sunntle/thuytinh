import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Order from "../pages/Order/Order.jsx"
import Menu from "../pages/Menu/Menu.jsx";
import Layout from "../layouts/index.jsx";
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
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import BookingTable from "../pages/BookingTable/index.jsx";
import SelectTable from "../pages/SelectTable/index.jsx";

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
      {
        path: "book-table",
        element: <BookingTable />,
      },
      {
        path: "select-table",
        element: <SelectTable/>,
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
        element: <Navigate to=".." state={{ from: 'menu' }} replace/>,
      },
      { path: "home", 
      element: <Navigate to="/home" state={{ from: 'home' }} replace/> },
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
        path: "about",
        element: <AboutUs />,
      }
    ],
  },
  { path: "/payment-loading", element: <PaymentLoading /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/url-return", element: <PaymentSuccess /> },
  { path: "/delivery-not-supported", element: <DeliveryNotSupported /> },
  { path: "/sign-up", element: <SignUp />},
  { path: "/sign-in", element: <SignIn />},
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default router;
