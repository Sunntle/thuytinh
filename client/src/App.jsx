import React from 'react';
import FoodCard from "./components/FoodCard.jsx";
import OrderFood from "./pages/OrderFood/OrderFood.jsx";

const App = () => {
    return (
        <div className={"w-12/12 h-full"}>
            <OrderFood/>
        </div>
    );
};

export default App;