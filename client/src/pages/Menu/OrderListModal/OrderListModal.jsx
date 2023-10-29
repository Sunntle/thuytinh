import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./index.css";
import { BiSolidTrash } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/format.js";
import {
  addIdOrderTable,
  addOrderDetailUpdate,
  decreaseQuantity,
  emptyOrder,
  increaseQuantity,
  removeFromOrder,
} from "../../../redux/Order/orderSlice.js";
import useHttp from "../../../hooks/useHttp.js";
import { addOrder } from "../../../services/api.js";

const { confirm } = Modal;

const OrderListModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  setIsOrderModalOpen,
}) => {
  const [newOrder, setNewOrder] = useState(null);
  const [orderUpdated, setOrderUpdated] = useState(null);
  const { order: orders, idOrder } = useSelector((state) => state.order);
  const customerName = useSelector((state) => state.customerName);
  const idTable = location.pathname.split("/")[1].split("-")[1];
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
      table: [idTable],
      token: localStorage.getItem("tableToken"),
    };
    try {
      await sendRequest(addOrder(body), setNewOrder);
      dispatch(emptyOrder());
    } catch (err) {
      console.log(err);
    }
    setIsOrderModalOpen(false);
  };
  useEffect(() => {
    if (newOrder?.success === false) {
      alert(newOrder?.data);
    } else if (newOrder?.success === true) {
      let dataPrevious = newOrder?.data?.detail?.map((item, i) => ({
        ...item,
        inDb: item.quantity,
        ...newOrder?.data?.product[i],
      }));
      dispatch(addOrderDetailUpdate(dataPrevious));
      dispatch(
        addIdOrderTable({
          idOrder: newOrder?.data?.orders?.id,
          idTable: customerName?.tables[0],
        }),
      );
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
      setIsOrderModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      className="lg:hidden"
      height={600}
      title="Món Đã Chọn"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={[
        <Button key={1} onClick={handleUpdateOrder}>
          Cập nhật
        </Button>,
        <Button
          disabled={orders?.length === 0}
          className="bg-primary text-white active:text-white focus:text-white hover:text-white font-medium"
          key={2}
          size="middle"
          onClick={submitOrderList}
        >
          Đặt món
        </Button>,
      ]}
    >
      <div className="max-h-96 overflow-y-auto space-y-3 custom-scrollbar">
        {orders?.length > 0 ? (
          orders?.map((item, index) => (
            <div
              key={index}
              className="border h-auto w-auto rounded-lg grid grid-cols-12 gap-4 text-slate-500 overflow-hidden shadow-sm"
            >
              {/* Image */}
              <div className="col-span-5">
                <img
                  className="w-full h-full rounded-tl-lg rounded-bl-lg"
                  src={item.ImageProducts[0]?.url}
                  alt={item.name_product}
                />
              </div>
              {/* Content */}
              <div className="col-span-7 flex flex-col justify-between py-2">
                <div className="flex flex-col space-y-1">
                  <span className="text-base md:text-lg font-bold overflow-hidden block text-primary">
                    {item.name_product}
                  </span>
                  <span className="text-md md:text-md font-normal">
                    Giá:
                    <span className="font-bold">
                      {formatCurrency(item.price)}
                    </span>
                  </span>
                  <span className="text-md md:text-md">Số lượng: </span>
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
                </div>
                <div className="self-end mr-2">
                  <BiSolidTrash
                    onClick={() => showDeleteConfirm(item.id)}
                    className="w-5 h-5 text-red-600"
                  />
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
      </div>
    </Modal>
  );
};

export default OrderListModal;
