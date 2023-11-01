import React, { useEffect, useState } from "react";
import { Button, Drawer, message, Modal } from "antd";
import "./index.css";
import { formatCurrency } from "../../../utils/format.js";
import { HiXMark } from "react-icons/hi2";
import { AiFillWarning } from "react-icons/ai";
import {
  addIdOrderTable,
  addOrderDetailUpdate,
  decreaseQuantity,
  emptyOrder,
  increaseQuantity,
  removeFromOrder,
} from "../../../redux/Order/orderSlice.js";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/useHttp.js";
import { addOrder } from "../../../services/api.js";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const OrderListDesktop = (props) => {
  const { isOrderDesktop, setIsOrderDesktop } = props;
  const [newOrder, setNewOrder] = useState(null);
  const [orderUpdated, setOrderUpdated] = useState(null);
  const { order: orders, idOrder } = useSelector((state) => state.order);
  const customerName = useSelector((state) => state.customerName);
  const [messageApi, contextHolder] = message.useMessage();
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();

  // Calculate Total Bill
  const totalOrder = orders?.reduce((acc, cur) => {
    acc += cur.quantity * cur.price;
    return acc;
  }, 0);
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn muốn xóa món ăn này ?",
      icon: <AiFillWarning className="w-5 h-5 text-red-600" />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        try {
          dispatch(removeFromOrder(id));
        } catch (err) {
          console.log(err);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleIncreaseQuantity = (data) => {
    if (data) {
      dispatch(increaseQuantity(data));
    }
  };

  const handleDecreaseQuantity = (data) => {
    if (data) {
      dispatch(decreaseQuantity(data));
    }
  };
  const submitOrderList = async () => {
    const body = {
      orders: orders,
      total: totalOrder,
      customerName: customerName.name,
      table: [customerName.tables[0]],
      token: localStorage.getItem("tableToken"),
    };
    try {
      await sendRequest(addOrder(body), setNewOrder);
      messageApi.open({
        type: "success",
        content: "Đặt món thành công",
      });
      dispatch(emptyOrder());
      window.location.href = `http://localhost:3000/ban-${customerName.tables[0]}/order`;
    } catch (err) {
      console.log(err);
    } finally {
      setIsOrderDesktop(false);
    }
  };

  useEffect(() => {
    if (newOrder?.success) {
      dispatch(
        addIdOrderTable({
          idOrder: newOrder?.data?.orders?.id,
          idTable: customerName?.tables[0],
        }),
      );
    } else {
      messageApi.open({
        type: "error",
        content: "Đặt món thất bại",
      });
    }
  }, [customerName?.tables, dispatch, newOrder]);

  const handleUpdateOrder = () => {
    const body = {
      total: totalOrder,
      carts: orders,
      id_order: idOrder,
    };
    try {
      const request = {
        method: "put",
        url: "/order",
        ...body,
      };
      sendRequest(request, setOrderUpdated);
      dispatch(emptyOrder());
      window.location.href = `http://localhost:3000/ban-${customerName.tables[0]}/order`;
    } catch (err) {
      console.error(err);
    } finally {
      setIsOrderDesktop(false);
    }
  };

  return (
    <Drawer
      closable={false}
      open={isOrderDesktop}
      onClose={() => setIsOrderDesktop(false)}
    >
      <span className="block text-xl font-semibold my-4">Món đã chọn</span>
      <div className="relative max-w-full min-h-screen">
        {orders?.length > 0 ? (
          orders?.map((item, index) => (
            <div key={index} className="w-full flex flex-col">
              <div className="flex justify-between items-center border-b pb-8 mx-3">
                {/*Image and Product*/}
                <div className="flex justify-between items-center space-x-6">
                  <div className="h-28 w-28">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={item.ImageProducts[0]?.url}
                      alt={item.name_product}
                    />
                  </div>
                  <span className="text-lg text-slate-800 font-medium">
                    {item.name_product}
                  </span>
                </div>
                {/* Tools */}
                <div className="flex justify-between items-center space-x-12">
                  <div className="flex items-center">
                    <span
                      onClick={() => handleDecreaseQuantity(item)}
                      className="cursor-pointer rounded-l bg-gray-100 w-8 h-8 flex items-center justify-center duration-100 hover:bg-primary hover:text-blue-50"
                    >
                      -
                    </span>
                    <input
                      readOnly={true}
                      className="w-8 h-8 bg-white text-center text-xs outline-none"
                      type="number"
                      value={item.quantity}
                      min={1}
                    />
                    <span
                      onClick={() => handleIncreaseQuantity(item)}
                      className="cursor-pointer rounded-r bg-gray-100 w-8 h-8 flex items-center justify-center duration-100 hover:bg-primary hover:text-blue-50"
                    >
                      +
                    </span>
                  </div>
                  <span>{formatCurrency(item.price)}</span>
                  <span className="cursor-pointer group">
                    <HiXMark
                      onClick={() => showDeleteConfirm(item.id)}
                      className="w-6 h-6 text-red-600 group-hover:text-red-500 transition-colors"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-5">
            <span className="text-center font-bold text-lg">
              Vui lòng chọn món
            </span>
          </div>
        )}
        <div className="w-full flex justify-between items-center text-lg font-semibold text-primary mt-10 px-2">
          <span className="flex items-center font-normal">Quay về</span>
          <div className="flex justify-between items-center space-x-1">
            <span className="text-sm text-slate-500">Tạm tính: </span>
            <span className="text-xl">{formatCurrency(totalOrder || 0)}</span>
          </div>
        </div>
        <div className="w-full flex justify-end items-center text-lg font-semibold text-primary mt-10 px-2 space-x-2">
          <Button onClick={handleUpdateOrder}>Cập nhật</Button>
          <Button
            disabled={orders?.length === 0}
            className="bg-primary text-white active:text-white focus:text-white hover:text-white font-medium"
            size="middle"
            onClick={submitOrderList}
          >
            Đặt món
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default OrderListDesktop;
