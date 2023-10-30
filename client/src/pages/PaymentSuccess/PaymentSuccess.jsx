import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp.js";
import { fetchOrderById, fetchTableById } from "../../services/api.js";
import { Spin, Table } from "antd";
import logo2 from "../../assets/images/logo2.png";
import moment from "moment";
import { formatCurrency } from "../../utils/format.js";
import "./index.css";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { idOrder, idTable } = useSelector((state) => state.order);
  const { name: customerName } = useSelector((state) => state.customerName);
  const [dataUpdated, setDataUpdated] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [listOrder, setListOrder] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const { sendRequest, isLoading } = useHttp();
  const tableToken = localStorage.getItem("tableToken");

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        sendRequest(fetchOrderById(idOrder), setOrderData),
        sendRequest(fetchTableById(idTable, tableToken), setListOrder),
      ]);
    };
    fetchData();
  }, [sendRequest, idOrder, idTable, tableToken]);
  console.log("re-render");

  useEffect(() => {
    if (orderData !== null) {
      if (
        orderData?.data?.transaction_id !== null &&
        orderData?.data?.transaction_date !== null
      ) {
        const body = {
          orderId: orderData?.data?.transaction_id,
          transDate: orderData?.data?.transaction_date,
        };
        try {
          const request = {
            method: "post",
            url: "/payment/vnpay_querydr",
            ...body,
          };
          sendRequest(request, setPaymentData);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [orderData, sendRequest]);

  useEffect(() => {
    if (paymentData !== null) {
      const body = {
        idOrder: idOrder,
        idTable: idTable,
      };
      const request = {
        method: "put",
        url: "/payment/update_status",
        ...body,
      };
      sendRequest(request, setDataUpdated);
    }
  }, [paymentData, idOrder, idTable, sendRequest]);

  const columns = [
    {
      title: "Tên món ăn",
      dataIndex: "Product.name_product",
      key: "name",
      render: (_, record) => <span>{record?.Product?.name_product}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "Product.price",
      key: "price",
      render: (_, record) => (
        <span>{formatCurrency(record?.Product?.price)}</span>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <span>{formatCurrency(record?.Product?.price * record?.quantity)}</span>
      ),
    },
  ];

  if (isLoading === true) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        {isLoading && <Spin size={"large"} />}
        <span className="mt-5 text-base font-semibold">
          Quý khách vui lòng đợi trong giây lát.
        </span>
      </div>
    );
  }

  return (
    <div className="lg:bg-slate-100 lg:py-2 min-h-screen max-w-full">
      <div className="relative h-screen w-screen bg-white max-w-full lg:max-w-3xl mx-auto lg:shadow-2xl text-slate-800">
        {/* Logo */}
        <div className="flex justify-start p-4">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16">
              <img
                className="w-full h-full object-cover rounded-full"
                src={logo2}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-center -space-y-1">
              <span className="text-lg lg:text-xl uppercase text-primary">
                Thủy Tinh
              </span>
              <span className="text-slate-500 text-xs lg:text-base">
                Chìm đắm trong hải sản tươi ngon
              </span>
            </div>
          </div>
        </div>
        {/* Invoice Text*/}
        <div className="flex items-center justify-start mt-6 gap-x-3">
          <div className="relative bg-primary h-6 lg:h-8 w-full"></div>
          <span className="block whitespace-nowrap uppercase text-2xl lg:text-4xl font-medium">
            Hóa đơn
          </span>
          <div className="relative bg-primary h-6 lg:h-8 w-4/12"></div>
        </div>
        {/*Information Invoice*/}
        <div className="max-w-full flex items-center justify-between px-4 mt-14 text-sm md:text-base ">
          {/**/}
          <div className="flex flex-col items-start justify-start font-medium space-y-2">
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Tên khách hàng:</span>
              <span className="block font-semibold text-primary">
                {listOrder[0]?.TableByOrders[0]?.order?.name}
              </span>
            </div>
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Phương thức:</span>
              <span className="whitespace-nowrap font-semibold text-primary">
                {orderData?.data?.payment_gateway}
              </span>
            </div>
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Số bàn:</span>
              <span className="whitespace-nowrap font-semibold text-primary">
                {listOrder[0]?.id}
              </span>
            </div>
          </div>
          {/**/}
          <div className="flex flex-col items-end justify-start font-medium space-y-2">
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Hóa đơn số:</span>
              <span className="block font-semibold text-primary">
                {orderData?.data?.transaction_id}
              </span>
            </div>
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Ngày:</span>
              <span className="whitespace-nowrap font-semibold text-primary">
                {moment(
                  orderData?.data?.transaction_date,
                  "YYYYMMDDHHmmss"
                ).format("DD-MM-YYYY")}
              </span>
            </div>
          </div>
        </div>
        {/*Order*/}
        <div className="w-full px-4 mt-5">
          <Table
            columns={columns}
            pagination={false}
            dataSource={listOrder[0]?.TableByOrders[0]?.order?.order_details}
          />
        </div>
        {/*  */}
        <div className="w-full px-4 mt-4 flex justify-between items-start text-sm md:text-base font-semibold">
          <Link
            to={"/home"}
            className="text-primary text-base md:text-lg underline"
          >
            Quay về trang chủ
          </Link>
          <div className="min-w-0 flex flex-col justify-start items-end space-y-3">
            <div className="flex justify-between items-center w-full space-x-5">
              <span className="whitespace-nowrap">Tạm tính:</span>
              <span className="block font-semibold text-primary">
                {formatCurrency(
                  listOrder[0]?.TableByOrders[0]?.order?.total || 0
                )}
              </span>
            </div>
            <div className="flex justify-between items-center w-full space-x-5">
              <span className="whitespace-nowrap">VAT:</span>
              <span className="block font-semibold text-primary">10%</span>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 flex justify-end items-center text-base md:text-xl font-semibold text-white">
          <div className="min-w-0 flex flex-col justify-start items-end bg-primary">
            <div className="flex justify-between items-center w-full space-x-5 py-1 px-3">
              <span className="whitespace-nowrap">Tổng cộng:</span>
              <span className="block font-semibold">
                {formatCurrency(
                  listOrder[0]?.TableByOrders[0]?.order?.total || 0
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-full mt-20 flex flex-col justify-center items-center">
          <div className="w-5/12 bg-slate-800 h-1 rounded"></div>
          <span className="mt-10 text-primary text-2xl font-semibold">
            Xin chân thành cảm ơn quý khách
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
