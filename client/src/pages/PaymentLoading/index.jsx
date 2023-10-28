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
  const { idOrder } = useSelector((state) => state.order);
  const [data, setData] = useState(null);
  console.log(dataResponse)
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
      navigate("/payment-success");
    } else {
      setIsModalOpen(true);
    }
  }, [data]);

  // if (isModalOpen)
  //   return (
  //     <Modal width={600} title="Thông Báo" open={isModalOpen} footer={false} centered>
  //       <div className="flex flex-col w-full space-y-4">
  //         <span className="text-red-600 font-semibold">{errorMessage}</span>
  //         <Button
  //             className="bg-red-600 text-white"
  //             onClick={() =>
  //                 (window.location.href = `http://localhost:3000/home`)
  //             }
  //         >
  //           Quay về trang chủ
  //         </Button>
  //       </div>
  //     </Modal>
  //   );

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {isLoading && <Spin size={"large"} />}
      <span className="mt-5 text-base font-semibold">
        Quý khách vui lòng đợi trong giây lát.
      </span>
      <Modal
          title="Thông báo"
          open={isModalOpen}
          footer={false}
      >
        {errorMessage}
        <Button onClick={() => window.location.href=`http://localhost:3000/ban-${+tables[0]}/menu`}>Quay về trang chủ</Button>
      </Modal>
    </div>
  );
};

export default PaymentLoading;
