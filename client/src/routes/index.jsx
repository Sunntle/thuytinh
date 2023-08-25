import { createBrowserRouter } from "react-router-dom";
import BookingPage from "../pages/BookingPage";
import ChooseTablePage from "../pages/ChooseTablePage";
import LoginPage from "../pages/LoginPage";

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
    ],
  },
]);
export default router;
