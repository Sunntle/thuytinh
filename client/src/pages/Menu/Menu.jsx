import React, { useEffect, useState } from "react";
import "./index.css";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import useHttp from "../../hooks/useHttp.js";
import { formatCurrency } from "../../utils/format.js";
import {useDispatch, useSelector} from "react-redux";
import OrderListModal from "../../components/OrderListModal/OrderListModal.jsx";
import {addToOrder} from "../../redux/Order/orderSlice.js";

const Menu = () => {
  const [active, setActive] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { sendRequest } = useHttp();
  const [foods, setFoods] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order)

  useEffect(() => {
    const request = {
      method: "get",
      url: "/product",
    };
    sendRequest(request, setFoods);
  }, [sendRequest]);

  const handleAddToOrder = (product) => {
    if (product) {
      dispatch(addToOrder(product))
    }
  }

  const showOrderListModal = () => {
    setIsOrderModalOpen(true);
  };
  const handleOk = () => {
    setIsOrderModalOpen(false);
  };
  const handleCancel = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="pb-24 text-slate-800">
      <div className="flex flex-col px-6 mt-8 space-y-4">
        <div className="grid grid-cols-12 gap-4 text-slate-500 ">
          <div className="col-span-10 w-full h-12 bg-slate-100 rounded-lg flex justify-start items-center space-x-3 px-2">
            <FiSearch className="w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              className="h-full w-full bg-transparent focus:outline-none text-sm"
            />
          </div>
          {/* Ordering */}
          <div
            onClick={() => showOrderListModal()}
            className="relative col-span-2 w-full h-12 bg-slate-100 rounded-lg p-2 flex justify-center items-center lg:cursor-pointer"
          >
            <BiFoodMenu className="w-6 h-6" />
            <span className="absolute -right-1 px-2 py-0.5 rounded-full -top-1 text-xs bg-primary text-white">
              {orders.length}
            </span>
          </div>
          <OrderListModal
            isModalOpen={isOrderModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>
        {/*Category*/}
        <div className="relative w-full text-sm">
          <span className="text-base font-medium block mb-3">Danh mục</span>
          <div className=" flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
            <button
              onClick={() => setActive(!active)}
              className={`px-4 py-2 border rounded-full whitespace-nowrap transition-colors duration-100 ${
                active
                  ? "text-white bg-primary drop-shadow"
                  : "text-slate-800 bg-white"
              }`}
            >
              Tất cả
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full whitespace-nowrap">
              Đồ nướng
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Lẩu
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Hấp
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Xào
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Chiên
            </button>
          </div>
          {/* Overlay */}
          <div className="absolute right-0 bottom-0 w-12 h-1/2 bg-white bg-opacity-60"></div>
        </div>
        {/* Filter with material */}
        {active && (
          <div className="relative w-full text-sm">
            <div className=" flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Tôm
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Cua
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Cá
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Ốc
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Mực
              </button>
            </div>
            {/* Overlay */}
            <div className="absolute right-0 bottom-0 w-12 h-1/2 bg-white bg-opacity-60"></div>
          </div>
        )}
        {/*Food*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {foods &&
            foods?.data?.map((item) => (
              <div key={item.id} className="w-auto h-auto border rounded-lg">
                <div className="w-full h-40">
                  <img
                    className="w-full h-full rounded-t-lg"
                    src={item.imageUrls}
                    alt={item.name_product}
                  />
                </div>
                <div className="flex justify-between items-center p-2 text-slate-500">
                  <div>
                    <span className="text-sm md:text-base font-medium overflow-hidden block">
                      {item.name_product}
                    </span>
                    <span className="text-xs md:text-sm">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                  <button onClick={() => handleAddToOrder(item)}>
                    <AiFillPlusCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
