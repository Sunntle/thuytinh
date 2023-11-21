// React
import { useCallback, useMemo } from "react";
// React-icons
import { AiFillWarning } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
// Components
import { Drawer, message, Popconfirm } from "antd";
// Hooks
import useHttp from "../../../../hooks/useHttp.js";
// Utils
import { formatCurrency } from "../../../../utils/format.js";
import {
  handleDeleteConfirm,
  handleOrderReduxDecreaseQuantity,
  handleOrderReduxIncreaseQuantity,
} from "../../../../utils/buttonUtils.js";
// Services
import { addOrder } from "../../../../services/api.js";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addIdOrderTable,
  checkIsOrdered,
  emptyOrder,
} from "../../../../redux/Order/orderSlice.js";
// External File
import "./index.css";
import Image from "../../../Image/Image.jsx";
import PropTypes from "prop-types";

const OrderListDesktop = ({ isOrderDesktop, setIsOrderDesktop }) => {
  const {
    order: orders,
    idOrder,
    isOrdered,
    previousQuantity,
    isActiveBooking,
  } = useSelector((state) => state.order);
  const customerName = useSelector((state) => state.customerName);
  const [messageApi, contextHolder] = message.useMessage();
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();

  // Calculate Total Bill
  const totalOrder = useMemo(
    () => orders?.reduce((acc, cur) => acc + cur.quantity * cur.price, 0),
    [orders],
  );

  const currentQuantity = useMemo(
    () => orders?.reduce((acc, cur) => acc + cur.quantity, 0),
    [orders],
  );

  const submitOrderList = useCallback(async () => {
    const body = {
      orders: orders,
      total: totalOrder,
      customerName: customerName.name,
      table: [customerName.tables[0]],
      token: localStorage.getItem("tableToken"),
    };
    try {
      const response = await sendRequest(addOrder(body), undefined, true);
      if (response?.success) {
        dispatch(
          addIdOrderTable({
            idOrder: response?.data?.orders?.id,
            idTable: customerName?.tables[0],
          }),
        );
        dispatch(checkIsOrdered(true));
        dispatch(emptyOrder());
        messageApi.open({
          type: "success",
          content: "Đặt món thành công",
        });
        window.location.href = `${import.meta.env.MODE === "production"
          ? import.meta.env.VITE_APP_CLIENT_URL_PRODUCTION
          : import.meta.env.VITE_APP_CLIENT_URL
          }/tables-${customerName.tables[0]}/order`;
      } else {
        messageApi.open({
          type: "error",
          content: response.message
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
      const res = await sendRequest(request, undefined, true);
      if (res.success) {
        dispatch(emptyOrder());
        window.location.href = `${import.meta.env.MODE === "production"
          ? import.meta.env.VITE_APP_CLIENT_URL_PRODUCTION
          : import.meta.env.VITE_APP_CLIENT_URL
          }/tables-${customerName.tables[0]}/order`;
      } else {
        messageApi.open({
          type: "error",
          content: res.message
        });
      }

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
                      loading={item.imageproducts[0]?.url && false}
                      src={item.imageproducts[0]?.url}
                      className="rounded-full"
                      alt={item.name_product}
                    />
                  </div>
                  <span className="text-lg text-slate-800 font-medium line-clamp-1">
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
                  <span className="min-w-[70px] block text-end">
                    {formatCurrency(item.price)}
                  </span>
                  <span className="cursor-pointer group">
                    <Popconfirm
                      disabled={item.inDb && true}
                      title={"Bạn có muốn xóa món ăn này"}
                      okText={"Có"}
                      okType={"danger"}
                      cancelText={"Không"}
                      onConfirm={() => handleDeleteConfirm(item.id, dispatch)}
                      icon={
                        <AiFillWarning className="w-5 h-5 text-red-600 disabled:text-red-300" />
                      }
                    >
                      <button>
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
          <span
            onClick={() => setIsOrderDesktop(false)}
            className="flex items-center font-normal cursor-pointer hover:text-primary/80"
          >
            Quay về
          </span>
          <div className="flex justify-between items-center space-x-1">
            <span className="text-sm text-slate-500">Tạm tính: </span>
            <span className="text-xl">{formatCurrency(totalOrder || 0)}</span>
          </div>
        </div>
        <div className="w-full flex justify-end items-center text-lg font-normal text-primary mt-10 px-2 space-x-2">
          <button
            onClick={handleUpdateOrder}
            className={`text-sm py-2 px-4 bg-transparent rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition-colors duration-200 ${idOrder === 0 ||
              (isActiveBooking && !orders.some((i) => i.inDb)) ||
              currentQuantity === previousQuantity
              ? "hidden"
              : ""
              }`}
          >
            Cập nhật
          </button>

          <button
            className={`text-sm py-2 px-4 bg-primary rounded-md text-white hover:bg-primary/20 hover:text-primary transition-colors duration-200 ${isOrdered ||
              orders?.length === 0 ||
              orders.some((i) => i.inDb && true)
              ? "hidden"
              : ""
              }`}
            onClick={submitOrderList}
          >
            Đặt món
          </button>
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
