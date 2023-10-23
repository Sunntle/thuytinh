import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp.js";
import {fetchOrderById, fetchTableById} from "../../services/api.js";
import { Spin, Table} from "antd";
import logo2 from "../../assets/images/logo2.png";
import moment from "moment";

const columns = [
  {
    title: 'Tên món ăn',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Tổng cộng',
    dataIndex: 'total',
    key: 'total'
  }
]

const PaymentSuccess = () => {
  const { idOrder } = useSelector((state) => state.order);
  const { name: customerName } = useSelector((state) => state.customerName);
  const [orderData, setOrderData] = useState(null);
  const [listOrder, setListOrder] = useState(null)
  const [paymentData, setPaymentData] = useState(null);
  const { sendRequest, isLoading } = useHttp();
  const idTable = location.pathname.split("/")[1].split("-")[1];

  useEffect(() => {
    sendRequest(fetchOrderById(idOrder), setOrderData);
    sendRequest(fetchTableById(idTable, idOrder), setListOrder)
  }, [sendRequest, idOrder, idTable]);
  console.log(listOrder)
  useEffect(() => {
    if (orderData !== null) {
      if (
        orderData.data.transaction_id !== null &&
        orderData.data.transaction_date !== null
      ) {
        const body = {
          orderId: orderData.data.transaction_id,
          transDate: orderData.data.transaction_date,
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
  }, [orderData]);

  useEffect(() => {
    if (paymentData !== null) {
      console.log(paymentData);
    }
  }, [paymentData]);

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
      <div className="h-screen w-screen bg-white max-w-full lg:max-w-3xl mx-auto lg:shadow-2xl text-slate-800">
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
        <div className="flex items-center justify-start mt-2 gap-x-3">
          <div className="bg-primary h-6 lg:h-8 w-full"></div>
          <span className="block whitespace-nowrap uppercase text-2xl lg:text-4xl font-medium">
            Hóa đơn
          </span>
          <div className="bg-primary h-6 lg:h-8 w-4/12"></div>
        </div>
        {/*Information Invoice*/}
        <div className="max-w-full flex items-center justify-between px-4 mt-6">
          {/**/}
          <div className="flex flex-col items-start justify-center">
            <span className="text-sm text-black font-thin">
              HÓA ĐƠN ĐƯỢC GỬI CHO
            </span>
            <span className="block mt-2 text-base font-bold">
              {customerName}
            </span>
          </div>
          {/**/}
          <div className="flex flex-col items-end justify-start text-sm font-medium space-y-2">
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
                  "YYYYMMDDHHmmss",
                ).format("DD-MM-YYYY")}
              </span>
            </div>
          </div>
        </div>
        {/*Order*/}
        {/*<table className="mt-4 w-11/12 table-auto border rounded-sm border-separate border-spacing-y-3 mx-auto">*/}
        {/*  <thead>*/}
        {/*    <tr>*/}
        {/*      <th className="text-md border-b pb-3">Tên món ăn</th>*/}
        {/*      <th className="text-md border-b pb-3">Số lượng</th>*/}
        {/*      <th className="text-md border-b pb-3">Giá</th>*/}
        {/*      <th className="text-md border-b pb-3">Tổng</th>*/}
        {/*    </tr>*/}
        {/*  </thead>*/}
        {/*  <tbody className="text-center">*/}
        {/*    <tr className="">*/}
        {/*      <td className="text-sm overhidden">{truncateString('Cua hoàng đế',15)}</td>*/}
        {/*      <td className="text-sm">1</td>*/}
        {/*      <td className="text-sm">{formatCurrency(1000000)}</td>*/}
        {/*      <td className="text-sm">{formatCurrency(1000000)}</td>*/}
        {/*    </tr>*/}
        {/*    <tr className="">*/}
        {/*      <td className="text-sm">Cua hoàng đế</td>*/}
        {/*      <td className="text-sm">1</td>*/}
        {/*      <td className="text-sm">{formatCurrency(1000000)}</td>*/}
        {/*      <td className="text-sm">{formatCurrency(1000000)}</td>*/}
        {/*    </tr>*/}
        {/*    <tr className="">*/}
        {/*      <td className="text-sm">Cua hoàng đế</td>*/}
        {/*      <td className="text-sm">1</td>*/}
        {/*      <td className="text-sm">{formatCurrency(1000000)}</td>*/}
        {/*      <td className="text-sm">{formatCurrency(1000000)}</td>*/}
        {/*    </tr>*/}
        {/*  </tbody>*/}
        {/*</table>*/}
        <div className="w-full px-4 mt-3">
          <Table columns={columns} pagination={false}/>
        </div>
      {/*  */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
