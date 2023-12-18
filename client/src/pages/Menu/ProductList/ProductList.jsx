import Product from "../Product/Product.jsx";
import Spinner from "../../../components/Spinner/Spinner.jsx";
import PropTypes from "prop-types";
import { addToOrder } from "../../../redux/Order/orderSlice.js";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProductList = ({ foods, isLoading }) => {
  const { isSuccess } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess?.status.length > 0) {
      message.open({ type: isSuccess.type, content: isSuccess.message });
    }
  }, [isSuccess]);

  const handleAddToOrder = async (product) => {
    if (!product) {
      message.open({
        type: "danger",
        content: "Không tồn tại món ăn này",
      });
      return;
    }

    if (!(product.amount > 0)) {
      message.open({
        type: "info",
        content: "Sản phẩm đã hết hàng",
      });
      return;
    }
    dispatch(addToOrder(product));
  };

  if (isLoading) return <Spinner />;
  if (foods === null)
    return (
      <span className="w-full flex justify-center items-center font-medium text-base">
        Không có dữ liệu
      </span>
    );
  //sort product out of stock: foods?.data.sort((a,b)=> b.amount - a.amount)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {foods &&
        foods?.data.map((item, index) => (
          <span key={index}>
            <Product item={item} handleAddToOrder={handleAddToOrder} />
          </span>
        ))}
    </div>
  );
};

ProductList.propTypes = {
  foods: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
  }),
  isLoading: PropTypes.bool,
};

export default ProductList;
