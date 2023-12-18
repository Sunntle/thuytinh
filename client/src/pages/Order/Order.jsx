import { Collapse, Divider, Form, message, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/index.js";
import useHttp from "../../hooks/useHttp.js";
import {
  addOrderDetailUpdate,
  emptyOrder,
} from "../../redux/Order/orderSlice.js";
import { fetchOrderById, fetchTableById } from "../../services/api.js";
import {
  calculateTotalWithVAT,
  formatCurrency,
  ScrollToTop,
} from "../../utils/format.js";
import "./index.css";
import { socket } from "../../services/socket.js";
import { Helmet } from "react-helmet";
import Image from "../../components/Image/Image.jsx";

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sendRequest, isLoading } = useHttp();
  const [data, setData] = useState([]);
  const { tables } = useSelector((state) => state.customerName);
  const { idOrder } = useSelector((state) => state.order);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const tableToken = localStorage.getItem("tableToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(false);

  const order = data?.data?.[0]?.tablebyorders?.[0]?.order || [];
  const totalOrder = calculateTotalWithVAT(order?.total, 10);

  useEffect(() => {
    sendRequest(fetchTableById(tables[0], tableToken), setData, false);
  }, [sendRequest, tableToken, tables]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddNewOrder = async () => {
    const dataPrevious = order?.order_details?.map((item) => {
      const { product, quantity } = item;
      return { ...product, quantity, inDb: quantity };
    });
    dispatch(addOrderDetailUpdate(dataPrevious));
    navigate(`/tables-${tables[0]}/menu`);
  };

  const onFinish = async (values) => {
    const {
      data: { status: status_order },
    } = await sendRequest(fetchOrderById(idOrder), undefined, true);

    if (status_order > 0 && status_order < 3) {
      values = { ...values, amount: totalOrder };
      setLoadingState(true);
      const request = {
        method: "post",
        url: "/payment/create_payment_url",
        ...values,
      };
      const response = await sendRequest(request, undefined, true);
      dispatch(emptyOrder());
      setIsModalOpen(false);
      form.resetFields();
      if (response !== null) {
        window.location.href = String(response);
      }
    } else if (status_order === 3) {
      message.open({ type: "warning", content: "Hoá đơn đã thanh toán" });
    }
  };

  const handlePayInCash = () => {
    socket.emit("pay-in-cash", tables[0]);
    messageApi.open({
      type: "info",
      content: "Vui lòng đợi trong giây lát, nhân viên sẽ đến thanh toán",
    });
  };

  if (isLoading || loadingState) return <Spinner />;

  return (
    <div className="pb-24 mt-24 lg:mt-0 lg:pt-12">
      {contextHolder}
      <ScrollToTop />
      <Helmet>
        <title>Món đã đặt</title>
        <meta name="order" content="Order" />
      </Helmet>

      <div className="bg-white px-6 xl:px-12">
        <h1 className="mb-5 text-center text-2xl font-bold text-primary">
          Món đã đặt
        </h1>

        <div className="relative">
          <div className="w-full min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Main */}
            <div className="w-full overflow-hidden border md:col-span-7 p-2 rounded-lg space-y-3 shadow-sm">
              {order?.order_details?.length > 0 ? (
                order?.order_details?.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 border rounded-lg gap-2 p-1 shadow-sm"
                  >
                    <div className="col-span-5 md:col-span-4 h-28 xl:h-36">
                      <div className="w-full h-full rounded-lg">
                        <Image
                          className="object-cover rounded-md"
                          src={
                            item?.product?.imageproducts[1]?.url ||
                            item?.product?.imageproducts[0]?.url
                          }
                          alt={item?.product?.name_product}
                        />
                      </div>
                    </div>
                    <div className="col-span-7 md:col-span-8 flex flex-col text-slate-500 mt-1 space-y-1">
                      <span className="font-bold text-base md:text-lg text-slate-800">
                        {item?.product?.name_product}
                      </span>
                      <span className="text-sm md:text-base font-medium">
                        Giá: {formatCurrency(item?.product?.price)}
                      </span>
                      <span className="text-xs md:text-base font-medium">
                        Số lượng: {item?.quantity}
                      </span>
                      <div className="flex items-center justify-start space-x-1">
                        <BiPencil className="w-3 h-3" />
                        <span className="text-xs md:text-sm">Ghi chú: </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:mt-4 text-center text-base font-semibold">
                  Vui lòng đặt món
                </div>
              )}
            </div>

            {/* Aside */}
            <div className="relative w-full md:col-span-5 text-slate-500 overflow-hidden">
              <div className="sticky top-0 border p-5 shadow-sm rounded-lg">
                <div className="w-full flex justify-between items-center">
                  <span className="text-lg font-medium text-slate-800">
                    Tổng ({order?.order_details?.length || 0} món)
                  </span>
                  <span>{formatCurrency(order?.total || 0)}</span>
                </div>

                <div className="w-full flex justify-between items-center">
                  <span className="text-lg font-medium text-slate-800">
                    VAT
                  </span>
                  <span>{0.1 * 100}%</span>
                </div>

                <Divider />

                <div className="w-full flex justify-between items-center text-slate-800">
                  <span className="text-lg font-bold">Thành tiền</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(totalOrder)}
                  </span>
                </div>

                <button
                  onClick={handleAddNewOrder}
                  disabled={order?.status === 3}
                  className="mt-8 mb-2 w-full py-2 rounded-lg bg-transparent border border-slate-100 hover:bg-slate-100 hover:text-slate-800 transition-colors duration-200"
                >
                  Thêm món mới
                </button>

                <button
                  className="w-full bg-primary py-2 text-white rounded-lg hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                  disabled={
                    order?.order_details?.length === 0 || order.length === 0
                  }
                  onClick={showModal}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
          <Modal
            title="Phương thức thanh toán"
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            <div className="w-full flex flex-col justify-start items-center space-y-1">
              <Collapse
                ghost
                items={[
                  {
                    key: "1",
                    label: "Thanh toán bằng VNPAY",
                    children: (
                      <Form form={form} onFinish={onFinish}>
                        <Form.Item name="bankCode">
                          <Radio.Group className="radio-custom">
                            <Radio value="">Cổng thanh toán VNPAYQR</Radio>
                            <Radio value="VNPAYQR">
                              Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                            </Radio>
                            <Radio value="VNBANK">
                              Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                            </Radio>
                            <Radio value="INTCARD">
                              Thanh toán qua thẻ quốc tế
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item className="text-right">
                          <button
                            type={"submit"}
                            className="text-base font-medium py-2 w-full bg-primary rounded text-white hover:bg-primary/20 border border-transparent hover:border-primary hover:text-primary transition-colors duration-200"
                          >
                            Thanh toán
                          </button>
                        </Form.Item>
                      </Form>
                    ),
                  },
                  {
                    key: "2",
                    label: "Thanh toán bằng tiền mặt",
                    children: (
                      <button
                        onClick={handlePayInCash}
                        type={"submit"}
                        className="text-base font-medium py-2 w-full bg-primary rounded text-white hover:bg-primary/20 border border-transparent hover:border-primary hover:text-primary transition-colors duration-200"
                      >
                        Thanh toán bằng tiền mặt
                      </button>
                    ),
                  },
                ]}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Order;
