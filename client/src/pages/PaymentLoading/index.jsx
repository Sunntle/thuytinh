import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { parseQueryString } from "../../utils/format.js";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp.js";

const PaymentLoading = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const {sendRequest} = useHttp()
  const [isLoading, setIsLoading] = useState(true);
  const dataResponse = parseQueryString(location.search);
  const { idOrder } = useSelector((state) => state.order);
  const [data, setData] = useState(null)
  const paymentResponse = {
    idOrder: idOrder,
    transaction_id: dataResponse.vnp_TxnRef,
    transaction_date: dataResponse.vnp_PayDate,
  };

  useEffect(() => {
    const request = {
      method: 'put',
      url: '/payment/update_transaction',
      ...paymentResponse
    }
    sendRequest(request, setData)

    if (data !== null) {
      navigate('/payment-success')
    }
  }, [sendRequest,data]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {isLoading && <Spin size={"large"} />}
      <span className="mt-5 text-base font-semibold">
        Quý khách vui lòng đợi trong giây lát.
      </span>
    </div>
  );
};

export default PaymentLoading;
