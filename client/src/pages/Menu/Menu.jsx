import { useEffect, useState } from "react";
import "./index.css";
import { FiSearch } from "react-icons/fi";
import { BiFoodMenu } from "react-icons/bi";
import useHttp from "../../hooks/useHttp.js";
import { useSelector } from "react-redux";
import OrderListModal from "../../components/OrderListModal/OrderListModal.jsx";
import { Spin } from "antd";
import useDebounce from "../../hooks/useDebounce.js";
import ProductList from "../../components/ProductList/ProductList.jsx";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";

const Menu = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { sendRequest, isLoading, error } = useHttp();
  const [foods, setFoods] = useState(null);
  const [categories, setCategories] = useState(null);
  const orders = useSelector((state) => state.order);
  const debouncedValue = useDebounce(searchValue, 100);

  useEffect(() => {
    const categoryRequest = {
      method: "get",
      url: "/category",
    };

    const productRequest = {
      method: "get",
      url: "/product",
    };

    sendRequest(categoryRequest, setCategories);
    sendRequest(productRequest, setFoods);
  }, [sendRequest]);


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

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

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
      <div className="flex flex-col px-6 mt-8 space-y-4 lg:mt-24">
        <div className="lg:hidden grid grid-cols-12 gap-4 text-slate-500 ">
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
          <span className="text-base lg:text-xl font-semibold block mb-3">
            Danh mục
          </span>
          <CategoryList
            categories={categories}
            activeIndex={activeIndex}
            handleGetAllFood={handleGetAllFood}
            handleFilterFoodByCategory={handleFilterFoodByCategory}
          />
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
        <ProductList foods={foods} />
      </div>
    </div>
  );
};

export default Menu;
