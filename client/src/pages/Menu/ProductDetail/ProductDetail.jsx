import { memo, useEffect, useState } from "react";
import { Drawer } from "antd";
import {
  calculateTotalWithDiscount,
  formatCurrency,
} from "../../../utils/format.js";
import useHttp from "../../../hooks/useHttp.js";
import { HiMiniXMark } from "react-icons/hi2";
import { fetchProductById } from "../../../services/api.js";
import Image from "../../../components/Image/Image.jsx";
import { Spinner } from "../../../components/index.js";
import PropTypes from "prop-types";

const ProductDetail = memo(({ openDrawer, onClose, id }) => {
  const [productDetail, setProductDetail] = useState({});
  const { sendRequest, isLoading } = useHttp();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    sendRequest(fetchProductById(id), setProductDetail, false);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id, sendRequest]);

  console.log(productDetail);

  if (isLargeScreen) {
    return null;
  }

  return isLoading ? (
    <Drawer
      height={"80%"}
      onClose={onClose}
      open={openDrawer}
      placement={"bottom"}
      key={"bottom"}
      extra={
        <span className="font-semibold text-base text-primary capitalize">
          Chi tiết sản phẩm
        </span>
      }
    >
      <Spinner />
    </Drawer>
  ) : (
    <Drawer
      closeIcon={<HiMiniXMark className="text-slate-800" size={28} />}
      height={"95%"}
      onClose={onClose}
      open={openDrawer}
      placement={"bottom"}
      key={"bottom"}
      extra={
        <span className="font-semibold text-base text-primary capitalize">
          Chi tiết món ăn
        </span>
      }
    >
      <div className="text-slate-500">
        <div className="w-auto h-auto rounded">
          <Image
            className="rounded"
            src={
              productDetail?.imageUrls || productDetail?.ImageProducts?.[0]?.url
            }
            alt={productDetail?.name_product}
          />
        </div>
        <div
          className={`text-sm mt-3 font-medium ${
            !productDetail.amount || productDetail.amount > 0
              ? "text-green-500"
              : " text-red-500 "
          }`}
        >
          {!productDetail.amount || productDetail.amount > 0
            ? "Còn món"
            : "Hết món"}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg text-slate-500 line-clamp-2">
            {productDetail?.name_product}
          </span>
          <div className="flex justify-between items-end space-x-1">
            <span className="text-sm font-normal line-through">
              {formatCurrency(productDetail?.price)}
            </span>
            <span className="font-medium text-base text-primary">
              {formatCurrency(
                calculateTotalWithDiscount(
                  productDetail?.price,
                  productDetail?.discount,
                ),
              )}
            </span>
          </div>
        </div>
        <span className="block text-sm text-red-500">
          Đã bán: {productDetail?.sold}
        </span>
        <ul className="list-disc ml-4">
          <li>
            <span className="text-base font-medium">Số lượng: </span>
            <span>{productDetail?.amount}</span>
          </li>
          <li>
            <span className="text-base font-medium">Mô tả sản phẩm:</span>
            <p>{productDetail?.description}</p>
          </li>
        </ul>
      </div>
    </Drawer>
  );
});
ProductDetail.displayName = "ProductDetail";
ProductDetail.propTypes = {
  openDrawer: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.number,
};
export default ProductDetail;
