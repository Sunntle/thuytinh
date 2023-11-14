import Product from "../Product/Product.jsx";
import Spinner from "../../../components/Spinner/Spinner.jsx";
import PropTypes from "prop-types";

const ProductList = ({ foods, isLoading }) => {
    if (isLoading) return <Spinner />;
    if (foods === null)
      return (
        <span className="w-full flex justify-center items-center font-medium text-base">
          Không có dữ liệu
        </span>
      );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {foods &&
        foods?.data?.sort((a,b) => b.amount - a.amount).map((item) => (
          <span key={item.id}>
            <Product item={item} />
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
            })
        ),
    }),
    isLoading: PropTypes.bool,
};

export default ProductList;
