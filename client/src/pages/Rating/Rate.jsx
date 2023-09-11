import { useState } from "react";
import panda from "../../assets/images/panda.png";
import { FaStar } from "react-icons/fa";
import { Modal } from "antd";

const Rate = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ratings = [
    { amount: 1, label: "Rất tệ" },
    { amount: 2, label: "Tệ" },
    { amount: 3, label: "Tạm ổn" },
    { amount: 4, label: "Tốt" },
    { amount: 5, label: "Rất tuyệt vời" },
  ];

  const rate = (amount) => {
    if (rating === amount) {
      setRating(0);
    } else {
      setRating(amount);
    }
  };

  const currentLabel = () => {
    let r = rating;
    if (hoverRating !== rating) r = hoverRating;
    const i = ratings.findIndex((e) => e.amount === r);
    if (i >= 0) {
      return ratings[i].label;
    } else {
      return "";
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pb-24">
      <div className="flex flex-col items-center justify-center space-y-4 m-4 p-4 bg-white rounded-md shadow-md">
        <h1 className="mb-2 text-center text-xl font-medium text-primary">
          Đánh giá của bạn
        </h1>
        <div className="flex space-x-2">
          {ratings.map((star, index) => (
            <button
              key={index}
              onClick={() => rate(star.amount)}
              onMouseOver={() => setHoverRating(star.amount)}
              onMouseLeave={() => setHoverRating(rating)}
              aria-hidden="true"
              title={star.label}
              className={`rounded-sm text-gray-300 fill-current focus:outline-none focus:shadow-outline w-7 m-0 cursor-pointer ${
                hoverRating >= star.amount
                  ? "text-yellow-400"
                  : rating >= star.amount && hoverRating >= star.amount
                  ? "text-yellow-400"
                  : ""
              }`}
            >
              <FaStar className="w-7 transition duration-150" />
            </button>
          ))}
        </div>
        <p className="text-primary">
          {rating || hoverRating ? (
            <span>{currentLabel()}</span>
          ) : (
            <span>Chưa đánh giá</span>
          )}
        </p>
        <div className="w-full rounded-md border border-gray-300 p-2">
          <textarea
            className="w-full h-32 resize-none focus:outline-none border-0 focus:ring-opacity-50 text-gray-700"
            placeholder="Nhập đánh giá của bạn..."
          />
        </div>
        <button
          onClick={() => {
            showModal();
          }}
          className="w-full rounded-md bg-primary py-2 font-medium text-white hover:bg-[#F0A500E5]"
        >
          Gửi đánh giá
        </button>
        <Modal
          title="Đánh giá đã được gửi"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <button
              key="ok"
              onClick={handleOk}
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
    </div>
  );
};

export default Rate;
