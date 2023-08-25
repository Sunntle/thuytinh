import { createBrowserRouter } from "react-router-dom";
import BookingPage from "../pages/BookingPage";
import ChooseTablePage from "../pages/ChooseTablePage";
import LoginPage from "../pages/LoginPage";
import OrderFood from "../pages/OrderPage/OrderFood.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <BookingPage />,
      },
      {
        path: "table",
        element: <ChooseTablePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "area",
        element: <BookingPage />
      },
      {
        path: "order",
        element: <OrderFood />
      }
    ],
  },
]);
export default router;
