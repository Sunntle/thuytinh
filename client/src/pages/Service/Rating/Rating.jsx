import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Rate, Spin } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/useHttp.js";
const desc = ["Rất tệ", "Tệ", "Tạm được", "Tốt", "Rất tuyệt vời"];

const Rating = ({ ratingModal, setRatingModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(3);
  const [form] = Form.useForm();
  const customerName = useSelector((state) => state.customerName);
  const { idOrder } = useSelector((state) => state.order);
  const { sendRequest, isLoading } = useHttp();
  const onFinish = async (values) => {
    if(isLoading) return;
    const { rating, text } = values;
    const dataToSend = {
      name: customerName.name,
      id_order: idOrder,
      description: text,
      rate: rating,
    };
    try {
      await sendRequest({
        method: "post",
        url: "/review",
        ...dataToSend,
      });
      setIsModalOpen(true);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu lên server", error);
    }
  };

  const onFinishFailed = (error) => {
    console.error(error);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseRatingModal = () => {
    setRatingModal(false);
  };

  return (
    <Modal
      title={"Đánh giá"}
      centered
      open={ratingModal}
      onOk={handleCloseRatingModal}
      onCancel={handleCloseRatingModal}
      footer={false}
    >
      <div className="w-full space-y-4 px-4 p-4 bg-white rounded-md shadow-md">
        <h1 className="mb-2 text-center text-xl font-medium text-primary">
          Đánh giá của bạn
        </h1>
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            className="flex flex-col justify-center items-center mb-0"
            name="rating"
            rules={[{ required: true, message: "Vui lòng đánh giá sao !" }]}
          >
            <Rate tooltips={desc} value={value} onChange={setValue} />
          </Form.Item>
          <div className="text-center my-3">
            {value ? (
              <span className="ant-rate-text">{desc[value - 1]}</span>
            ) : (
              ""
            )}
          </div>
          <Form.Item
            name="text"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập phản hồi !",
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ maxRows: 4 }}
              // classNames="w-full h-32 focus:outline-none border-0 focus:ring-opacity-50 text-gray-700"
              placeholder="Nhập đánh giá của bạn..."
            ></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              disabled={idOrder === 0 || customerName.name.length == 0}
              className="mt-3 w-full rounded-md bg-primary py-2 font-medium text-white disabled:bg-slate-200 hover:bg-[#F0A500E5]"
            >
              {isLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    />
                  }
                />
              ) : (
                "Gửi đánh giá"
              )}
            </button>
          </Form.Item>
          <span className="block text-red-500 mt-3 text-center">
            {idOrder === 0 && "Vui lòng đặt món để được đánh giá"}
          </span>
        </Form>
        <Modal
          title="Đánh giá đã được gửi"
          open={isModalOpen}
          onOk={handleCloseModal}
          onCancel={handleCloseModal}
          footer={[
            <button
              key="ok"
              onClick={handleCloseModal}
              className="bg-primary hover:bg-[#F0A500E5] text-white py-2 px-4 rounded"
            >
              OK
            </button>,
          ]}
        >
          <p className="text-gray-700">
            Đánh giá của bạn đã được gửi thành công.
          </p>
        </Modal>
      </div>
    </Modal>
  );
};
Rating.propTypes = {
  ratingModal: PropTypes.any,
  setRatingModal: PropTypes.any,
};
export default Rating;
