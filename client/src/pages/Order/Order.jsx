import { Button, Collapse, Divider, Form, Modal, Radio } from "antd";
import { useEffect, useMemo, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { calculateTotalWithVAT, formatCurrency } from "../../utils/format.js";
import useHttp from "../../hooks/useHttp.js";
import { fetchTableById } from "../../services/api.js";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { emptyOrder } from "../../redux/Order/orderSlice.js";

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState(null);
  const { sendRequest } = useHttp();
  const [data, setData] = useState([]);
  const { tables } = useSelector((state) => state.customerName);
  const [form] = Form.useForm();
  const tableToken = localStorage.getItem("tableToken");
  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest(fetchTableById(tables[0], tableToken), setData);
  }, [tables[0], sendRequest, tableToken]);

  const order = data[0]?.TableByOrders?.[0]?.order || [];

  const totalOrder = useMemo(
    () => calculateTotalWithVAT(order?.total, 10),
    [order?.total],
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    values = { ...values, amount: totalOrder };
    const request = {
      method: "post",
      url: "/payment/create_payment_url",
      ...values,
    };
    await sendRequest(request, setPayment);
    dispatch(emptyOrder());
    form.resetFields();
  };

  useEffect(() => {
    if (payment !== null) {
      window.location.href = String(payment);
    }
  }, [payment]);

  return (
    <div className="pb-24 mt-24 lg:mt-0 lg:pt-12">
      <div className="bg-white px-6 xl:px-12">
        <h1 className="mb-5 text-center text-2xl font-bold text-primary">
          Món đã đặt
        </h1>
        <div className="">
          <div className="w-full min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Main */}
            <div className="w-full overflow-hidden border md:col-span-7 p-2 rounded-lg space-y-3 shadow-sm">
              {order?.order_details?.length ? (
                order?.order_details?.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 border rounded-lg gap-2 p-1 shadow-sm"
                  >
                    <div className="col-span-5 md:col-span-4 h-28 xl:h-36">
                      <div className="w-full h-full rounded-lg">
                        <img
                          loading={"lazy"}
                          className="w-full h-full rounded-lg object-cover"
                          src={item?.Product?.ImageProducts[0]?.url}
                          alt={item?.Product?.name_product}
                        />
                      </div>
                    </div>
                    <div className="col-span-7 md:col-span-8 flex flex-col text-slate-500 mt-1 space-y-1">
                      <span className="font-bold text-base md:text-lg text-slate-800">
                        {item?.Product?.name_product}
                      </span>
                      <span className="text-sm md:text-base font-medium">
                        Giá: {formatCurrency(item?.Product?.price)}
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
                <div className="text-center text-base font-semibold">
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
                <Button
                  disabled={order?.order_details?.length <= 0}
                  onClick={showModal}
                  size="large"
                  className="mt-8 w-full bg-primary text-white"
                >
                  Thanh toán
                </Button>
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
                          <Button
                            type={"primary"}
                            htmlType={"submit"}
                            className="bg-primary"
                          >
                            Thanh toán
                          </Button>
                        </Form.Item>
                      </Form>
                    ),
                  },
                  {
                    key: "2",
                    label: "Thanh toán bằng tiền mặt",
                    children: (
                      <Button
                        size={"large"}
                        className="w-full bg-primary text-white"
                      >
                        Thanh toán bằng tiền mặt
                      </Button>
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
