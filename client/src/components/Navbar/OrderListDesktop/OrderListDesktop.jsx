import React from "react";
import { Drawer } from "antd";
import "./index.css";
import { formatCurrency } from "../../../utils/format.js";
import product from "../../../assets/images/product.png";
import {HiXMark} from "react-icons/hi2";
import {useSelector} from "react-redux";

const OrderListDesktop = (props) => {
  const { isOrderDesktop, setIsOrderDesktop } = props;
  const { order: orders, idOrder } = useSelector((state) => state.order);

  return (
    <Drawer
      size={"large"}
      closable={false}
      open={isOrderDesktop}
      onClose={() => setIsOrderDesktop(false)}
    >
      <div className="relative max-w-full min-h-screen border">
        <span className="block text-xl font-semibold mb-12">Món đã chọn</span>
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center border-b pb-8 mx-3">
            {/*Image and Product*/}
            <div className="flex justify-between items-center space-x-6">
              <div className="h-28 w-28">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={product}
                  alt="image"
                />
              </div>
              <span className="text-lg text-slate-800 font-medium">
                Cua hoàng đế
              </span>
            </div>
            {/* Tools */}
            <div className="flex justify-between items-center space-x-12">
              <div className="flex items-center">
                <span
                  // onClick={() => handleDecreaseQuantity(item)}
                  className="cursor-pointer rounded-l bg-gray-100 w-8 h-8 flex items-center justify-center duration-100 hover:bg-primary hover:text-blue-50"
                >
                  -
                </span>
                <input
                  readOnly={true}
                  className="w-8 h-8 bg-white text-center text-xs outline-none"
                  type="number"
                  value={1}
                  min={1}
                />
                <span
                  // onClick={() => handleIncreaseQuantity(item)}
                  className="cursor-pointer rounded-r bg-gray-100 w-8 h-8 flex items-center justify-center duration-100 hover:bg-primary hover:text-blue-50"
                >
                  +
                </span>
              </div>
              <span>{formatCurrency(100000)}</span>
              <span className="cursor-pointer group"><HiXMark className="w-6 h-6 text-red-600 group-hover:text-red-500 transition-colors"/></span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center text-lg font-semibold text-primary mt-12">
          <span className="flex items-center font-normal">--> Quay về</span>
          <div className="flex justify-between items-center space-x-1">
            <span className="text-sm text-slate-500">Tạm tính: </span>
            <span className="text-xl">{formatCurrency(100000)}</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default OrderListDesktop;
