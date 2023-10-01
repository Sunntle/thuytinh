import React, { useState } from "react";
import { formatCurrency } from "../../utils/format.js";
import { AiFillPlusCircle } from "react-icons/ai";
import { addToOrder } from "../../redux/Order/orderSlice.js";
import { useDispatch } from "react-redux";
import ProductDetail from "../ProductDetail/ProductDetail.jsx";

const Product = (props) => {
  const { id, imageUrls, ImageProducts, name_product, price } = props.item;
  const dispatch = useDispatch();
  const [isProductDetailModalOpen, setIsShowProductDetailModalOpen] =
    useState(false);

  const showProductDetailModal = () => {
    setIsShowProductDetailModalOpen(true);
  };

  const handleOk = () => {
    setIsShowProductDetailModalOpen(false);
  };

  const handleCancel = () => {
    setIsShowProductDetailModalOpen(false);
  };

  const handleAddToOrder = (product) => {
    if (product) {
      dispatch(addToOrder(product));
    }
  };

  return (
    <div key={id} className="w-auto h-auto border rounded-lg">
      <div className="w-full h-40" onClick={showProductDetailModal}>
        <img
          className="w-full h-full rounded-t-lg"
          src={imageUrls || ImageProducts?.[0]?.url}
          alt={name_product}
        />
      </div>
      <div className="flex justify-between items-center p-2 text-slate-500">
        <div>
          <span className="text-sm md:text-base font-medium overflow-hidden block">
            {name_product}
          </span>
          <span className="text-xs md:text-sm">{formatCurrency(price)}</span>
        </div>
        <button onClick={() => handleAddToOrder(props.item)}>
          <AiFillPlusCircle className="w-6 h-6 md:w-8 md:h-8 text-primary active:text-opacity-80" />
        </button>
      </div>
      <ProductDetail
        item={props.item}
        isProductDetailModalOpen={isProductDetailModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
};

export default Product;
