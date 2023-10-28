import React from "react";
import Product from "../Product/Product.jsx";

const ProductList = ({ foods }) => {
  if (foods === null)
    return (
      <span className="w-full flex justify-center items-center font-medium text-base">
        Không có dữ liệu
      </span>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {foods &&
        foods?.data?.map((item) => (
          <span key={item.id}>
            <Product item={item} />
          </span>
        ))}
    </div>
  );
};

export default ProductList;
