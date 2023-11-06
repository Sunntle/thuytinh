// React
import { useCallback, useMemo } from "react";
// React-icons
import { AiFillWarning } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
// Components
import { Button, message, Modal, Popconfirm } from "antd";
import Image from "../../../components/Image/Image.jsx";
// Hooks
import useHttp from "../../../hooks/useHttp.js";
// Utils
import { formatCurrency } from "../../../utils/format.js";
import {
  addIdOrderTable,
  emptyOrder,
} from "../../../redux/Order/orderSlice.js";
// Services
import { addOrder } from "../../../services/api.js";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteConfirm,
  handleOrderReduxDecreaseQuantity,
  handleOrderReduxIncreaseQuantity,
} from "../../../utils/buttonUtils.js";
// External File
import "./index.css";
import PropTypes from "prop-types";

const OrderListModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  setIsOrderModalOpen,
}) => {
  const { order: orders, idOrder } = useSelector((state) => state.order);
  const customerName = useSelector((state) => state.customerName);
  const idTable = location.pathname.split("/")[1].split("-")[1];
  const { sendRequest } = useHttp();
  const [messageApi, contextHolder] = message.useMessage();
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
      table: [idTable],
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
        messageApi.open({
          type: "success",
          content: "Đặt món thành công",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Đặt món thất bại",
        });
      }
      dispatch(emptyOrder());
    } catch (err) {
      console.log(err);
    } finally {
      setIsOrderModalOpen(false);
    }
  }, [
    customerName.name,
    customerName?.tables,
    dispatch,
    idTable,
    messageApi,
    orders,
    sendRequest,
    setIsOrderModalOpen,
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
      const response = await sendRequest(request, undefined, true);
      if (response.success === true) {
        dispatch(emptyOrder());
        messageApi.open({
          type: "success",
          content: "Cập nhật món thành công",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOrderModalOpen(false);
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
        <Button
          key={1}
          onClick={handleUpdateOrder}
          disabled={orders?.length === 0 || orders.some((i) => i.inDb && false) || !orders.every((i) => i.inDb)}
        >
          Cập nhật
        </Button>,
        <Button
          disabled={orders?.length === 0 || orders.some((i) => i.inDb && true)}
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
        {contextHolder}
        {orders?.length > 0 ? (
          orders?.map((item, index) => (
            <div
              key={index}
              className="border h-auto w-auto rounded-lg grid grid-cols-12 gap-4 text-slate-500 overflow-hidden shadow-sm"
            >
              {/* Image */}
              <div className="col-span-5">
                <Image
                  loading={!item.ImageProducts[0]?.url && true}
                  src={item.ImageProducts[0]?.url}
                  className="rounded-tl-lg rounded-bl-lg"
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
                      onClick={() =>
                        handleOrderReduxDecreaseQuantity(item, dispatch)
                      }
                      className="cursor-pointer rounded-l bg-gray-100 w-8 h-8 flex items-center justify-center duration-100 hover:bg-primary hover:text-blue-50"
                    >
                      -
                    </span>
                    <input
                      readOnly={true}
                      className="w-8 h-8 bg-white flex items-center justify-center text-xs outline-none"
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
                </div>
                <div className="self-end mr-2">
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
                      <HiXMark className="w-6 h-6 text-red-600" />
                    </button>
                  </Popconfirm>
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

OrderListModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  setIsOrderModalOpen: PropTypes.func,
};

export default OrderListModal;
