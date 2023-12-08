// React
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"; // React-icons
import { FiChevronDown, FiSearch } from "react-icons/fi"; // Components
import { BiFoodMenu } from "react-icons/bi";
import OrderListModal from "./OrderListModal/OrderListModal.jsx";
import CategoryList from "./CategoryList/CategoryList.jsx";
import ProductList from "./ProductList/ProductList.jsx"; // Hooks
import useHttp from "../../hooks/useHttp.js";
import useDebounce from "../../hooks/useDebounce.js"; // Utils
import { ScrollToTop } from "../../utils/format.js";
import instance from "../../utils/axiosConfig.js"; // Services
import * as apiService from "../../services/api.js"; // Extenal Files
import "./index.css";
import { Helmet } from "react-helmet";
import { AiOutlineLoading } from "react-icons/ai";
import { resetStatusOrder } from "../../redux/Order/orderSlice.js";
import { FloatButton } from "antd";

const limit = 20;

const Menu = () => {
  const [foods, setFoods] = useState({ total: 0, data: [] });
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState(null);
  const [searchParams] = useSearchParams();
  const { order: orders } = useSelector((state) => state.order);
  const { sendRequest, isLoading } = useHttp();
  const debouncedValue = useDebounce(searchValue, 100);
  const categoryIndex = searchParams.get("category") || null;
  const dispatch = useDispatch();
  const fetchFoods = useCallback(async (length = 0) => {
    setIsProductLoading(true);
    try {
      const response = await instance.get(
        `/product?_limit=${limit}&_offset=${length}`,
      );
      setFoods((prev) => ({
        total: response.total,
        data: [...prev.data, ...response.data],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsProductLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkCate = async () => {
      const response = await sendRequest(
        apiService.fetchCategories(),
        undefined,
        true,
      );
      if (
        categoryIndex !== null &&
        response.some((el) => el.id === +categoryIndex)
      ) {
        await sendRequest(
          apiService.fetchProductsByCategory(categoryIndex),
          setFoods,
          false,
        );
        setCategories(response);
      } else {
        await fetchFoods();
      }
      setCategories(response);
    };
    checkCate();
  }, [sendRequest, categoryIndex, fetchFoods]);

  useEffect(() => {
    return () => dispatch(resetStatusOrder());
  }, [dispatch]);

  const handleChangeSearchValue = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSubmitSearchValue = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        if (searchValue.trim() !== "") {
          try {
            await sendRequest(
              apiService.searchProducts(debouncedValue),
              setFoods,
              false,
            );
          } catch (err) {
            console.error(err);
          }
        }
      }
    },
    [debouncedValue, searchValue, sendRequest],
  );

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
      <Helmet>
        <title>Thực đơn</title>
        <meta name="menu" content="Menu" />
      </Helmet>

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

        <ProductList foods={foods} isLoading={isLoading} />

        {foods.data.length > 0 && (
          <button
            disabled={isProductLoading}
            className={`text-lg group text-slate-500 flex items-center justify-center ${
              categoryIndex !== null || isLoading ? "hidden" : ""
            }`}
            onClick={() => fetchFoods(foods.data.length)}
          >
            <span className="mr-2 group-hover:text-primary transition-colors duration-200">
              {isProductLoading ? "Đang tải" : "Xem thêm"}
            </span>
            {isProductLoading ? (
              <AiOutlineLoading className="w-5 h-5 group-hover:text-primary transition-colors duration-200 animate-spin ease-linear" />
            ) : (
              <FiChevronDown className="w-6 h-6 group-hover:text-primary transition-colors duration-200" />
            )}
          </button>
        )}

        <OrderListModal
          isModalOpen={isOrderModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          setIsOrderModalOpen={setIsOrderModalOpen}
        />
      </div>
      <FloatButton.BackTop
        visibilityHeight={500}
        style={{ bottom: 80, right: 10 }}
      />
    </div>
  );
};

export default Menu;
