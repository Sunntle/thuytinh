// React
import { useCallback, useMemo } from "react"; // React-icons
import { AiFillWarning } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2"; // Components
import { message, Modal, Popconfirm } from "antd";
import Image from "../../../components/Image/Image.jsx"; // Hooks
import useHttp from "../../../hooks/useHttp.js"; // Utils
import { formatCurrency } from "../../../utils/format.js";
import {
  addIdOrderTable,
  checkIsActiveBooking,
  checkIsOrdered,
  emptyOrder,
} from "../../../redux/Order/orderSlice.js"; // Services
import { addOrder } from "../../../services/api.js"; // Redux
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
  const {
    order: orders,
    idOrder,
    isOrdered,
    previousQuantity,
    isActiveBooking,
  } = useSelector((state) => state.order);
  const customerName = useSelector((state) => state.customerName);
  const { sendRequest } = useHttp();
  const [messageApi, contextHolder] = message.useMessage();
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
    if (customerName.tables.length == 0) return; //navigate to select tables
    const body = {
      orders: orders,
      total: totalOrder,
      customerName: customerName.name,
      table: customerName.tables,
      token: localStorage.getItem("tableToken"),
    };
    try {
      const response = await sendRequest(addOrder(body), undefined, true);
      if (response?.success) {
        dispatch(
          addIdOrderTable({
            idOrder: idOrder !== 0 ? idOrder : response?.data?.orders?.id,
            idTable: customerName?.tables[0],
          }),
        );
        dispatch(checkIsOrdered(true));
        dispatch(checkIsActiveBooking(true));
        dispatch(emptyOrder());
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
    customerName.tables,
    dispatch,
    idOrder,
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
        dispatch(checkIsActiveBooking(true));
        messageApi.open({
          type: "success",
          content: "Cập nhật món thành công",
        });
      } else {
        message.open({
          type: "info",
          content: response.message,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOrderModalOpen(false);
    }
  };

  const onConfirmDelete = async (id) => {
    handleDeleteConfirm(id, dispatch);
    await message.open({
      type: "info",
      content: "Huỷ món thành công",
    });
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
        <button
          key={"2"}
          onClick={handleUpdateOrder}
          className={`text-sm py-[0.35rem] px-4 bg-transparent rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition-colors duration-200 ${
            idOrder === 0 ||
            (isActiveBooking && !orders.some((i) => i.inDb)) ||
            currentQuantity === previousQuantity
              ? "hidden"
              : ""
          }`}
        >
          Cập nhật
        </button>,

        <button
          key={"1"}
          className={`ml-2 text-sm py-[0.35rem] px-4 bg-primary rounded-md text-white border border-transparent hover:border-primary hover:bg-primary/20 hover:text-primary transition-colors duration-200 ${
            isOrdered ||
            orders?.length === 0 ||
            orders.some((i) => i.inDb && true)
              ? "hidden"
              : ""
          }`}
          onClick={submitOrderList}
        >
          Đặt món
        </button>,
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
                  loading={!item.imageproducts[0]?.url && true}
                  src={item.imageproducts[0]?.url}
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
                    Giá:{" "}
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
                    <span className="w-8 h-8 flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
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
                    disabled={item.inDb && true}
                    placement={"leftTop"}
                    title={
                      <span className="font-medium">
                        Bạn có muốn huỷ món ăn này
                      </span>
                    }
                    okText={"Đồng ý"}
                    okType={"danger"}
                    cancelText={"Huỷ"}
                    onConfirm={() => onConfirmDelete(item.id)}
                    onCancel={() => console.log("Hủy bỏ")}
                    icon={
                      <AiFillWarning className="w-5 h-5 text-red-600 disabled:text-red-300" />
                    }
                  >
                    <button>
                      <HiXMark className="w-5 h-5 text-red-600" />
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
