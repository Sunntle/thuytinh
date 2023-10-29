import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parseQueryString } from "../../utils/format.js";
import { Button, Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp.js";
import { checkErrorCode } from "../../utils/payment.js";

const PaymentLoading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataResponse = parseQueryString(location.search);
  const { idOrder, idTable } = useSelector((state) => state.order);
  const [data, setData] = useState(null);

  console.log(dataResponse);
  const paymentResponse = {
    idOrder: idOrder,
    transaction_id: dataResponse.vnp_TxnRef,
    transaction_date: dataResponse.vnp_PayDate,
    payment_gateway: dataResponse.vnp_BankCode,
  };

  useEffect(() => {
    if (checkErrorCode(dataResponse?.vnp_ResponseCode) === true) {
      const request = {
        method: "put",
        url: "/payment/update_transaction",
        ...paymentResponse,
      };
      sendRequest(request, setData);
    } else {
      const { message } = checkErrorCode(dataResponse?.vnp_ResponseCode);
      setErrorMessage(message);
    }
  }, [sendRequest]);

  useEffect(() => {
    if (data !== null) {
      setIsModalOpen(false);
      navigate("/payment-success");
    } else {
      setIsModalOpen(true);
    }
  }, [data]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {isLoading && <Spin size={"large"} />}
      <span className="mt-5 text-base font-semibold">
        Quý khách vui lòng đợi trong giây lát.
      </span>
      <Modal title="Thông báo" open={isModalOpen} footer={false}>
        {errorMessage}
        <Button
          onClick={() =>
            (window.location.href = `http://localhost:3000/ban-${idTable[0]}/menu`)
          }
        >
          Quay về trang chủ
        </Button>
      </Modal>
    </div>
  );
};

export default PaymentLoading;
