import React from "react";
import OrderFood from "./pages/OrderPage/OrderFood.jsx";
import OrderListMobile from "./pages/OrderPage/OrderListMobile.jsx";

import OrderSuccess from "./pages/OrderSuccess.jsx";

const App = () => {
    return (
        <div className={"w-12/12 h-full"}>
            <OrderSuccess />
        </div>
    );
};

export default App;
