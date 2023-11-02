import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parseQueryString } from "../../utils/format.js";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp.js";
import { checkErrorCode } from "../../utils/payment.js";

const PaymentLoading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataResponse = parseQueryString(location.search);
  const { idOrder, idTable } = useSelector((state) => state.order);

  const paymentResponse = useMemo(
    () => ({
      idOrder: idOrder,
      transaction_id: dataResponse.vnp_TxnRef,
      transaction_date: dataResponse.vnp_PayDate,
      payment_gateway: dataResponse.vnp_BankCode,
    }),
    [
      dataResponse.vnp_BankCode,
      dataResponse.vnp_PayDate,
      dataResponse.vnp_TxnRef,
      idOrder,
    ],
  );

  const handleNavigate = useCallback(async () => {
    const request = {
      method: "put",
      url: "/payment/update_transaction",
      ...paymentResponse,
    };
    const data = await sendRequest(request, undefined, true);
    if (data !== null) {
      setIsModalOpen(false);
      navigate("/payment-success", { state: { idOrder } });
    } else throw new Error("No data");
  }, [idOrder, navigate, paymentResponse, sendRequest]);

  useEffect(() => {
    if (checkErrorCode(dataResponse?.vnp_ResponseCode) === true) {
      handleNavigate();
    } else {
      const { message } = checkErrorCode(dataResponse?.vnp_ResponseCode);
      setErrorMessage(message);
    }
  }, [dataResponse?.vnp_ResponseCode, handleNavigate]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <span className="mt-5 text-base font-semibold">
        Quý khách vui lòng đợi trong giây lát.
      </span>
      <Modal title="Thông báo" open={isModalOpen} footer={false}>
        <span className="block text-red-600 text-lg">{errorMessage}</span>
        <Button
          className="w-full bg-red-600 active:bg-red-500 text-white mt-4"
          onClick={() =>
            (window.location.href = `http://localhost:3000/ban-${idTable}/menu`)
          }
        >
          Quay về trang chủ
        </Button>
      </Modal>
    </div>
  );
};

export default PaymentLoading;
