// React
import { useLayoutEffect, useMemo, useState } from "react";
// React-icons
import { AiFillPlusCircle } from "react-icons/ai";
// Components
import ProductDetail from "../ProductDetail/ProductDetail.jsx";
import Image from "../../../components/Image/Image.jsx";
// Utils
import { formatCurrency } from "../../../utils/format.js";
// Redux
import { addToOrder } from "../../../redux/Order/orderSlice.js";
import { useDispatch } from "react-redux";
// Motion
import { motion } from "framer-motion";

const Product = (props) => {
  const { id, name_product, price, amount, discount } = props.item;
  const imageUrl = useMemo(
    () => props.item.imageUrls || props.item.ImageProducts?.[0]?.url,
    [props.item],
  );
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [productDetail, setProductDetail] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useLayoutEffect(() => {
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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.15 }}
      key={id}
      className="min-h-0 w-auto h-auto border rounded-lg shadow"
    >
      <div className="w-full h-40" onClick={showProductDetail}>
        <Image
          loading={!imageUrl && true}
          src={imageUrl}
          className="rounded-t-lg"
          alt={name_product}
        />
      </div>
      <div className="flex justify-between items-center p-2 text-slate-500">
        <div className="flex h-full flex-col justify-end">
          {amount <= 0 ? (
            <span className="text-xs font-medium text-red-600 line-clamp-1">
              Hết món
            </span>
          ) : (
            <span className="text-xs font-medium text-green-600 line-clamp-1">
              Còn món
            </span>
          )}
          <span className="text-base lg:text-lg font-medium line-clamp-1">
            {name_product}
          </span>
          <p className="text-xs text-slate-400 line-through">
            {formatCurrency(price)}
          </p>
          <span className="text-sm md:text-sm lg:text-base font-medium text-primary">
            {formatCurrency(price) || formatCurrency(price)}
          </span>
        </div>
        <button
          className="group"
          disabled={amount <= 0}
          onClick={() => handleAddToOrder(props.item)}
        >
          <AiFillPlusCircle
            className={`w-6 h-6 md:w-8 md:h-8 text-primary group-disabled:text-primary/20 active:text-primary/80 group-hover:text-primary/80 transition-colors duration-200 ${
              amount <= 0 ? "text-primary/20" : ""
            }`}
          />
        </button>
      </div>
      {productDetail && (
        <ProductDetail id={id} openDrawer={openDrawer} onClose={onClose} />
      )}
    </motion.div>
  );
};

export default Product;
