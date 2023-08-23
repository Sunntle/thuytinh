import { createBrowserRouter } from "react-router-dom";
import BookingPage from "../pages/BookingPage";
import ChooseTablePage from "../pages/ChooseTablePage";
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
    ],
  },
]);
export default router;
