import React, { useEffect, useState } from "react";
import { Drawer, Spin } from "antd";
import "./main.css";
import { formatCurrency } from "../../utils/format.js";
import useHttp from "../../hooks/useHttp.js";
import {HiMiniXMark} from "react-icons/hi2";

const ProductDetail = ({ openDrawer, onClose, id }) => {
  const [productDetail, setProductDetail] = useState({});
  const { sendRequest, isLoading } = useHttp();

  useEffect(() => {
    const request = {
      method: "get",
      url: `product/${id}`,
    };
    sendRequest(request, setProductDetail);
  }, [sendRequest, id]);

  console.log(productDetail)
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
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Spin size={"large"} />
          <span className="mt-4 font-semibold text-lg">
          Quý khách vui lòng đợi trong giây lát !
        </span>
        </div>
      </Drawer>
  ) : (
    <Drawer
        closeIcon={<HiMiniXMark className="text-slate-800" size={28}/>}
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
      <div className="text-slate-500">
        <div className="w-auto h-48">
          <img className="w-full h-full rounded" src={productDetail?.imageUrls || productDetail?.ImageProducts?.[0].url } alt="" />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="font-semibold text-lg text-primary">
            Tôm hùm nướng
          </span>
          <span className="font-medium">{formatCurrency(1500000)}</span>
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDetail;
