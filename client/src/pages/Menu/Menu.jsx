// React
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
// React-icons
import { FiSearch } from "react-icons/fi";
import { BiFoodMenu } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
// Components
import OrderListModal from "./OrderListModal/OrderListModal.jsx";
import CategoryList from "./CategoryList/CategoryList.jsx";
import ProductList from "./ProductList/ProductList.jsx";
import { Button } from "antd";
// Hooks
import useHttp from "../../hooks/useHttp.js";
import useDebounce from "../../hooks/useDebounce.js";
// Utils
import { ScrollToTop } from "../../utils/format.js";
import instance from "../../utils/axiosConfig.js";
// Services
import * as apiService from "../../services/api.js";

// Extenal Files
import "./index.css";
const limit = 15;
const Menu = () => {
  const [foods, setFoods] = useState({ total: 0, data: []});
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState(null);
  const [searchParams] = useSearchParams();
  const { order: orders } = useSelector((state) => state.order);
  const { sendRequest, isLoading } = useHttp();
  const debouncedValue = useDebounce(searchValue, 100);
  const categoryIndex = searchParams.get("category") || null;

  const fetchFoods = useCallback(async (length = 0) => {
    setIsProductLoading(true);
    try {
      const response = await instance.get(
        `/product?_limit=${limit}&_offset=${length}`
      );
      setFoods(prev => ({
        total: response.total,
        data: [...prev.data, ...response.data]
      }));
    } catch (err) {
      console.error(err);
    }finally{
      setIsProductLoading(false)
    }
  }, []);

  useEffect(() => {
    const checkCate = async() =>{
      const response = await sendRequest(apiService.fetchCategories(), undefined, true);
      if (categoryIndex !== null && response.some(el=> el.id === +categoryIndex)) {
        sendRequest(apiService.fetchProductsByCategory(categoryIndex), setFoods,false);
        setCategories(response)
      } else {
        fetchFoods();
      }
      setCategories(response)
    }
    checkCate()
  }, [sendRequest, categoryIndex, fetchFoods]);

  const handleChangeSearchValue = useCallback((e) => {
    setSearchValue(e.target.value);
  },[]);

  const handleSubmitSearchValue = useCallback((e) => {
    if (e.key === "Enter") {
      if (searchValue.trim() !== "") {
        try {
          sendRequest(apiService.searchProducts(debouncedValue), setFoods,false);
        } catch (err) {
          console.error(err);
        }
      }
    }
  },[debouncedValue, searchValue, sendRequest]);

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
    <div className="pb-24 mt-24 lg:mt-0 text-slate-800 lg:px-16 px-6">
      <ScrollToTop />
      <div className="flex flex-col mt-8 space-y-8 lg:mt-24">
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
            onClick={showOrderListModal}
            className="relative col-span-2 w-full h-12 bg-slate-100 rounded-lg p-2 flex justify-center items-center lg:cursor-pointer active:bg-slate-200"
          >
            <BiFoodMenu className="w-6 h-6" />
            <span className="absolute -right-1 px-2 py-0.5 rounded-full -top-1 text-xs bg-primary text-white">
              {orders?.length || 0}
            </span>
          </div>
        </div>
        {/*Category*/}
        <div className="relative w-full text-sm">
          <span className="text-base lg:text-xl font-semibold block mb-3">
            Danh mục
          </span>
          <CategoryList categories={categories} activeIndex={+categoryIndex} />
        </div>
        <ProductList foods={foods} isLoading={isLoading}/>
        {foods.data.length > 0 && (
          <Button
            loading={isProductLoading}
            type="default"
            className={`text-lg flex items-center justify-center ${
              categoryIndex !== null || isLoading ? "hidden" : ""
            }`}
            onClick={()=>fetchFoods(foods.data.length)}
          >
            <span>Xem thêm</span>
            <FiChevronDown className="w-6 h-6" />
          </Button>
        )}
        <OrderListModal
          isModalOpen={isOrderModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          setIsOrderModalOpen={setIsOrderModalOpen}
        />
      </div>
    </div>
  );
};

export default Menu;
