import panda from "../../assets/images/panda.png";
import product from "../../assets/images/product.png";
import { Modal } from "antd";
import { useState } from "react";

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="bg-white pt-8">
        <h1 className="mb-5 text-center text-2xl font-bold text-primary">
          Món đã đặt
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <div className="justify-between rounded-lg bg-white p-6 shadow-md flex mb-2">
              <img src={product} alt="" className="w-1/3 rounded-lg" />
              <div className="sm:ml-4 sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    Tôm hùm ngon số 1
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">150.000 VNĐ</p>
                  <div className="flex items-center border-gray-100 mt-2">
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary hover:text-blue-50">
                      -
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      defaultValue={2}
                      min={1}
                    />
                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-primary hover:text-blue-50">
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Tổng ( 1 món )</p>
              <p className="text-gray-700">150.000 VNĐ</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">VAT</p>
              <p className="text-gray-700">10%</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Thành tiền</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">165.000 VNĐ</p>
              </div>
            </div>
            <button
              onClick={() => {
                showModal();
              }}
              className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-blue-50 hover:bg-[#F0A500E5] outline-none"
            >
              Thanh toán
            </button>
            <Modal
              title="Nhân viên đang đến."
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
                Quý khách vui lòng kiểm tra món lại 1 lần nữa. Nhân viên sẽ đến
                thanh toán trong giây lát.
              </p>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
