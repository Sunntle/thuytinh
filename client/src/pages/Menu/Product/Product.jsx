import { useEffect, useMemo, useState } from "react";
import { formatCurrency, truncateString } from "../../../utils/format.js";
import { AiFillPlusCircle } from "react-icons/ai";
import { addToOrder } from "../../../redux/Order/orderSlice.js";
import { useDispatch } from "react-redux";
import ProductDetail from "../ProductDetail/ProductDetail.jsx";

const Product = (props) => {
  const { id, name_product, price, amount } = props.item;
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [productDetail, setProductDetail] = useState(false);

  const imageUrl = useMemo(
    () => props.item.imageUrls || props.item.ImageProducts?.[0]?.url,
    [props.item]
  );

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showProductDetail = () => {
    if (!isLargeScreen) {
      setOpenDrawer(true);
      setProductDetail(true);
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleAddToOrder = (product) => {
    if (product) {
      dispatch(addToOrder(product));
    }
  };

  return (
    <div key={id} className="w-auto h-auto border rounded-lg">
      <div className="w-full h-40" onClick={showProductDetail}>
        <img
          className="w-full h-full rounded-t-lg"
          loading={"lazy"}
          src={imageUrl}
          alt={name_product}
        />
      </div>
      <div className="flex justify-between items-center p-2 text-slate-500">
        <div>
          {amount <= 0 && (
            <span className="text-sm md:text-base font-medium text-red-600 overflow-hidden block">
              Sản phẩm tạm hết hàng
            </span>
          )}
          <span className="text-sm md:text-base font-medium overflow-hidden block">
            {truncateString(name_product, 10)}
          </span>
          <span className="text-xs md:text-sm">{formatCurrency(price)}</span>
        </div>
        <button
          disabled={amount <= 0}
          onClick={() => handleAddToOrder(props.item)}
        >
          <AiFillPlusCircle className="w-6 h-6 md:w-8 md:h-8 text-primary active:text-opacity-80" />
        </button>
      </div>
      {productDetail && (
        <ProductDetail id={id} openDrawer={openDrawer} onClose={onClose} />
      )}
    </div>
  );
};

export default Product;
