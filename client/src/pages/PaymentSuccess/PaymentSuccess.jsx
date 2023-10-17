import React from 'react';
import {useLocation} from "react-router-dom";
import {parseQueryString} from "../../utils/format.js";

const PaymentSuccess = () => {
    const location = useLocation()
    console.log(parseQueryString(location.search))

    return (
        <div>

        </div>
    );
};

export default PaymentSuccess;