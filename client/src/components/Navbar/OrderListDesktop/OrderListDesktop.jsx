// React
import { useCallback, useMemo, useState } from "react";
// React-icons
import { AiFillWarning } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
// Components
import { Button, Drawer, message, Popconfirm } from "antd";
// Hooks
import useHttp from "../../../hooks/useHttp.js";
// Utils
import { formatCurrency } from "../../../utils/format.js";
import {
  handleDeleteConfirm,
  handleOrderReduxDecreaseQuantity,
  handleOrderReduxIncreaseQuantity,
} from "../../../utils/buttonUtils.js";
// Services
import { addOrder } from "../../../services/api.js";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addIdOrderTable,
  emptyOrder,
} from "../../../redux/Order/orderSlice.js";
// External File
import "./index.css";
import Image from "../../Image/Image.jsx";
import PropTypes from "prop-types";

const OrderListDesktop = ({ isOrderDesktop, setIsOrderDesktop }) => {
  const [newOrder, setNewOrder] = useState(null);
  const { order: orders, idOrder } = useSelector((state) => state.order);
  const customerName = useSelector((state) => state.customerName);
  const [messageApi, contextHolder] = message.useMessage();
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();

  // Calculate Total Bill
  const totalOrder = useMemo(() => (
      orders?.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
  ), [orders]);

  const submitOrderList = useCallback(async () => {
    const body = {
      orders: orders,
      total: totalOrder,
      customerName: customerName.name,
      table: [customerName.tables[0]],
      token: localStorage.getItem("tableToken"),
    };
    try {
      const response = await sendRequest(addOrder(body), setNewOrder, true);
      if (response?.success) {
        dispatch(
          addIdOrderTable({
            idOrder: newOrder?.data?.orders?.id,
            idTable: customerName?.tables[0],
          }),
        );
        dispatch(emptyOrder());
        messageApi.open({
          type: "success",
          content: "Đặt món thành công",
        });
        window.location.href = `http://localhost:3000/tables-${customerName.tables[0]}/order`;
      } else {
        messageApi.open({
          type: "error",
          content: "Đặt món thất bại",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsOrderDesktop(false);
    }
  }, [
    customerName.name,
    customerName.tables,
    dispatch,
    messageApi,
    newOrder?.data?.orders?.id,
    orders,
    sendRequest,
    setIsOrderDesktop,
    totalOrder,
  ]);

  const handleUpdateOrder = async () => {
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
      await sendRequest(request, undefined, true);
      dispatch(emptyOrder());
      window.location.href = `http://localhost:3000/tables-${customerName.tables[0]}/order`;
    } catch (err) {
      console.error(err);
    } finally {
      setIsOrderDesktop(false);
    }
  };

  return (
    <Drawer
      className="tracking-wide"
      closable={false}
      open={isOrderDesktop}
      size="large"
      onClose={() => setIsOrderDesktop(false)}
    >
      {contextHolder}
      <span className="block text-xl font-semibold my-4">Món đã chọn</span>
      <div className="relative max-w-full min-h-screen">
        {orders?.length > 0 ? (
          orders?.map((item, index) => (
            <div key={index} className="w-full flex flex-col">
              <div className="flex justify-between items-center border-b pb-8 mx-3">
                {/*Image and Product*/}
                <div className="flex justify-between items-center space-x-6">
                  <div className="h-28 w-28">
                    <Image
                      loading={item.ImageProducts[0]?.url && false}
                      src={item.ImageProducts[0]?.url}
                      className="rounded-full"
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
                      onClick={() =>
                        handleOrderReduxDecreaseQuantity(item, dispatch)
                      }
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
                      onClick={() =>
                        handleOrderReduxIncreaseQuantity(item, dispatch)
                      }
                      className="cursor-pointer rounded-r bg-gray-100 w-8 h-8 flex items-center justify-center duration-100 hover:bg-primary hover:text-blue-50"
                    >
                      +
                    </span>
                  </div>
                  <span>{formatCurrency(item.price)}</span>
                  <span className="cursor-pointer group">
                    <Popconfirm
                      title={"Bạn có muốn xóa món ăn này"}
                      okText={"Có"}
                      okType={"danger"}
                      cancelText={"Không"}
                      onConfirm={() => handleDeleteConfirm(item.id, dispatch)}
                      onCancel={() => console.log("Cancel")}
                      icon={
                        <AiFillWarning className="w-5 h-5 text-red-600 disabled:text-red-300" />
                      }
                    >
                      <button disabled={item.inDb && true}>
                        <HiXMark className="w-5 h-5 text-red-600" />
                      </button>
                    </Popconfirm>
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
        <div className="w-full flex justify-between items-center text-lg font-semibold text-primary mt-10 px-2 transition-colors duration-200">
          <span className="flex items-center font-normal cursor-pointer hover:text-primary/80">
            Quay về
          </span>
          <div className="flex justify-between items-center space-x-1">
            <span className="text-sm text-slate-500">Tạm tính: </span>
            <span className="text-xl">{formatCurrency(totalOrder || 0)}</span>
          </div>
        </div>
        <div className="w-full flex justify-end items-center text-lg font-semibold text-primary mt-10 px-2 space-x-2">
          <Button
            onClick={handleUpdateOrder}
            disabled={
              orders?.length === 0 ||
              orders.some((i) => i.inDb && false) ||
              !orders.every((i) => i.inDb)
            }
          >
            Cập nhật
          </Button>
          <Button
            disabled={
              orders?.length === 0 || orders.some((i) => i.inDb && true)
            }
            className="bg-primary text-white hover:text-white font-medium"
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

OrderListDesktop.propTypes = {
  isOrderDesktop: PropTypes.bool,
  setIsOrderDesktop: PropTypes.func,
};

export default OrderListDesktop;
