// React
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
// React-icons
import { AiFillPlusCircle } from "react-icons/ai";
// Components
import ProductDetail from "../ProductDetail/ProductDetail.jsx";
import { message } from "antd";
import Image from "../../../components/Image/Image.jsx";
// Utils
import {
  calculateTotalWithDiscount,
  formatCurrency,
} from "../../../utils/format.js";
// Redux
import { addToOrder } from "../../../redux/Order/orderSlice.js";
import { useDispatch } from "react-redux";
// Motion
import { usePresence, useAnimate } from "framer-motion";
import PropTypes from "prop-types";

const Product = (props) => {
  const { id, name_product, price, amount, discount } = props.item;
  const imageUrl = useMemo(
    () => props.item.imageUrls || props.item.ImageProducts?.[0]?.url,
    [props.item],
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
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

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [0, 1] },
          { duration: 0.5, delay: 0.05 * id },
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [1, 0] },
          { duration: 0.5, delay: 0.05 * id },
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [animate, id, isPresent, safeToRemove, scope]);

  const showProductDetail = () => {
    if (!isLargeScreen) {
      setOpenDrawer(true);
      setProductDetail(true);
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleAddToOrder = async (product) => {
    if (product) {
      dispatch(addToOrder(product));
    }
    await messageApi.open({
      type: "success",
      content: "Đã thêm món ăn",
    });
  };

  return (
    <div
      ref={scope}
      key={id}
      className="relative box-border tracking-wide min-h-0 w-auto h-auto border rounded-lg shadow cursor-pointer transition-shadow duration-300 hover:shadow-[3px_3px_15px_0px_rgba(192,194,201,0.2)]"
    >
      {contextHolder}
      <div className="w-full h-32 lg:h-40" onClick={showProductDetail}>
        <Image
          isLoading={!imageUrl && true}
          src={imageUrl}
          className="rounded-t-lg"
          alt={name_product}
        />
      </div>
      <div className="flex justify-between items-center p-2 text-slate-500">
        <div className="flex h-full flex-col justify-end">
          <span
            className={`text-xs font-medium line-clamp-1 ${
              !amount || amount > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {!amount || amount > 0 ? "Còn món" : "Hết món"}
          </span>
          <span className="text-base lg:text-lg font-medium line-clamp-1">
            {name_product}
          </span>
          <p className="text-xs text-slate-400 line-through">
            {formatCurrency(price)}
          </p>
          <span className="text-sm md:text-sm lg:text-base font-medium text-primary">
            {formatCurrency(calculateTotalWithDiscount(price, discount))}
          </span>
        </div>
        <button
          className="group"
          disabled={!(!amount || amount > 0)}
          onClick={() => handleAddToOrder(props.item)}
        >
          <AiFillPlusCircle
            className={`w-6 h-6 md:w-8 md:h-8 text-primary group-disabled:text-primary/20 active:text-primary/80 group-hover:text-primary/80 transition-colors duration-200 ${
              !amount || amount > 0 ? "" : "text-primary/20"
            }`}
          />
        </button>
      </div>
      {productDetail && (
        <ProductDetail id={id} openDrawer={openDrawer} onClose={onClose} />
      )}
    </div>
  );
};

Product.propTypes = {
  item: PropTypes.object,
};

export default Product;
