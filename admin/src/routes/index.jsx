import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../Layout";
import DashBoard from "../pages/DashBoard";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [
            {
                index: true,
                element: <DashBoard />
            },
        ],
    },
]);
export default router