import product from "../../assets/images/product.png";
import { Button, Divider, Modal } from "antd";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { formatCurrency } from "../../utils/format.js";
import { useDispatch, useSelector } from "react-redux";
import { emptySeletedItems } from "../../redux/SelectedItem/selectedItemsSlice.js";

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, total } = useSelector((state) => state.selectedItem);
  const dispatch = useDispatch();
  const VAT = 0.1;

  console.log(products)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(emptySeletedItems());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pb-24 mt-4 lg:mt-0 lg:pt-24">
      <div className="bg-white px-6 xl:px-12">
        <h1 className="mb-5 text-center text-2xl font-bold text-primary">
          Món đã đặt
        </h1>
        <div className="">
          <div className="w-full min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Main */}
            <div className="w-full overflow-hidden border md:col-span-7 p-2 rounded-lg space-y-3 shadow-sm">
              {products.length ? (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 border rounded-lg gap-2 p-1 shadow-sm"
                  >
                    <div className="col-span-5 md:col-span-4 h-28 xl:h-36">
                      <div className="w-full h-full">
                        <img
                          className="w-full h-full rounded-lg"
                          src={item?.ImageProducts[0]?.url}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-span-7 md:col-span-8 flex flex-col text-slate-500 mt-1 space-y-1">
                      <span className="font-bold text-base md:text-lg text-slate-800">
                        {item?.name_product}
                      </span>
                      <span className="text-sm md:text-base font-medium">
                        Giá: {formatCurrency(item?.price)}
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
              <div className="sticky top-0 xl:top-24 border p-5 shadow-sm rounded-lg">
                <div className="w-full flex justify-between items-center">
                  <span className="text-lg font-medium text-slate-800">
                    Tổng ({products.length} món)
                  </span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="w-full flex justify-between items-center">
                  <span className="text-lg font-medium text-slate-800">
                    VAT
                  </span>
                  <span>{VAT * 100}%</span>
                </div>
                <Divider />
                <div className="w-full flex justify-between items-center text-slate-800">
                  <span className="text-lg font-bold">Thành tiền</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(total * 0.8)}
                  </span>
                </div>
                <Button
                  disabled={products.length <= 0}
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
  );
};

export default Order;
