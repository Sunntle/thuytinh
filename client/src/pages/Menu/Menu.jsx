import { useEffect, useState } from "react";
import "./index.css";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import useHttp from "../../hooks/useHttp.js";
import { formatCurrency } from "../../utils/format.js";
import { useDispatch, useSelector } from "react-redux";
import OrderListModal from "../../components/OrderListModal/OrderListModal.jsx";
import { addToOrder } from "../../redux/Order/orderSlice.js";
import { Spin } from "antd";
import useDebounce from "../../hooks/useDebounce.js";
import Product from "../../components/Product/Product.jsx";

const Menu = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { sendRequest, isLoading, error } = useHttp();
  const [foods, setFoods] = useState(null);
  const [categories, setCategories] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const debouncedValue = useDebounce(searchValue, 300);

  const handleSubmitSearchValue = (e) => {
    if (e.key === "Enter") {
      if (searchValue.trim() !== "") {
        try {
          const request = {
            method: "get",
            url: `product/search?query=${debouncedValue}`,
          };
          sendRequest(request, setFoods);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleGetAllFood = (index) => {
    try {
      setActiveIndex(index === activeIndex ? null : index);
      const request = {
        method: "get",
        url: "/product",
      };
      sendRequest(request, setFoods);
    } catch (err) {
      console.log(error);
    }
  };

  const handleFilterFoodByCategory = (index) => {
    try {
      setActiveIndex(index === activeIndex ? null : index);
      const request = {
        method: "get",
        url: `/product/category/${index}`,
      };
      sendRequest(request, setFoods);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const request = {
      method: "get",
      url: "/category",
    };
    sendRequest(request, setCategories);
  }, [sendRequest]);

  useEffect(() => {
    const request = {
      method: "get",
      url: "/product",
    };
    sendRequest(request, setFoods);
  }, [sendRequest]);

  const showOrderListModal = () => {
    setIsOrderModalOpen(true);
  };
  const handleOk = () => {
    setIsOrderModalOpen(false);
  };
  const handleCancel = () => {
    setIsOrderModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="mt-56 h-full w-screen flex justify-center items-center flex-col">
        <Spin size={"large"}></Spin>
        <span className="mt-4 font-semibold text-lg">
          Quý khách vui lòng đợi trong giây lát !
        </span>
      </div>
    );
  }

  return (
    <div className="pb-24 text-slate-800 lg:px-12">
      <div className="flex flex-col px-6 mt-8 space-y-4">
        <div className="grid grid-cols-12 gap-4 text-slate-500 ">
          <div className="col-span-10 w-full h-12 bg-slate-100 rounded-lg flex justify-start items-center space-x-3 px-2">
            <FiSearch className="w-5 h-5" />
            <input
              type="text"
              value={searchValue}
              onChange={handleChangeSearchValue}
              onKeyDown={handleSubmitSearchValue}
              placeholder="Tìm kiếm món ăn..."
              className="h-full w-full bg-transparent focus:outline-none text-sm"
            />
          </div>
          {/* Ordering */}
          <div
            onClick={() => showOrderListModal()}
            className="relative col-span-2 w-full h-12 bg-slate-100 rounded-lg p-2 flex justify-center items-center lg:cursor-pointer active:bg-slate-200"
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
            setIsOrderModalOpen={setIsOrderModalOpen}
          />
        </div>
        {/*Category*/}
        <div className="relative w-full text-sm">
          <span className="text-base lg:text-xl font-semibold block mb-3">Danh mục</span>
          <div className=" flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
            <button
              disabled={activeIndex === 0}
              onClick={() => handleGetAllFood(0)}
              className={`px-4 py-2 border rounded-full whitespace-nowrap transition-colors duration-100 ${
                activeIndex === 0
                  ? "text-white bg-primary shadow"
                  : "text-slate-800 bg-white"
              }`}
            >
              Tất cả
            </button>
            {categories &&
              categories.map((category) => (
                <button
                  disabled={category.id === activeIndex}
                  key={category.id}
                  onClick={() => handleFilterFoodByCategory(category.id)}
                  className={`px-4 py-2 border rounded-full whitespace-nowrap transition-colors duration-100 ${
                    category.id === activeIndex
                      ? "text-white bg-primary shadow"
                      : "text-slate-800 bg-white"
                  }`}
                >
                  {category.name_category}
                </button>
              ))}
          </div>
          {/* Overlay */}
          <div className="absolute right-0 bottom-0 w-12 h-1/2 bg-white bg-opacity-60"></div>
        </div>
        {/* Filter with material */}
        {activeIndex !== 0 && (
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {foods &&
            foods?.data?.map((item) => (
              <Product key={item.id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
