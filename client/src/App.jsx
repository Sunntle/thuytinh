import React from "react";
import OrderFood from "./pages/OrderPage/OrderFood.jsx";
import OrderListMobile from "./pages/OrderPage/OrderListMobile.jsx";
import ChooseTablePage from "./pages/ChooseTablePage";

const App = () => {
  return (
    <div className={"w-12/12 h-full"}>
      <ChooseTablePage />
    </div>
  );
};

export default App;
