import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { HiMenu, HiOutlineClipboardCheck } from "react-icons/hi";
import ButtonComponent from "../../components/ButtonComponent.jsx";
import FoodCard from "../../components/FoodCard.jsx";
import SidebarMobile from "./SidebarMobile.jsx";

const OrderFood = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-12/12 h-screen  text-slate-800">
      <div className="sm:hidden space-y-5 p-4">
        <div className="flex justify-between items-center">
          <button>
            <FiChevronLeft className="w-7 h-7" />
          </button>
          <span className="text-2xl font-bold uppercase">Chọn món</span>
          <button>
            <HiOutlineClipboardCheck className="w-7 h-7" />
          </button>
        </div>
        <div className="w-full h-20 drop-shadow-md">
          <img
            src="https://images.unsplash.com/photo-1538333581680-29dd4752ddf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt=""
            className="w-full h-full aspect-video object-cover"
          />
        </div>
        <div className="flex justify-between items-center">
          <ButtonComponent
            onClick={() => setIsSidebarOpen(true)}
            className={"py-1 px-2 rounded flex items-center gap-1"}
            type={"outline"}
            size={"md"}
          >
            <HiMenu className="w-4 h-4" />
            <span>Menu</span>
          </ButtonComponent>
        </div>
        <div className="pt-3 space-y-5">
          {/*Món mới nhất*/}
          <div className="flex flex-col space-y-5">
            <span className="text-xl font-bold uppercase">
              Món bán chạy nhất
            </span>
            <div className="grid grid-cols-2 gap-4">
              <FoodCard />
              <FoodCard />
              <FoodCard />
              <FoodCard />
            </div>
          </div>
          {/*Món bán chạy nhất*/}
          <div className="flex flex-col space-y-5">
            <span className="text-xl font-bold uppercase">
              Món bán chạy nhất
            </span>
            <div className="grid grid-cols-2 gap-4">
              <FoodCard />
              <FoodCard />
              <FoodCard />
              <FoodCard />
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <SidebarMobile isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <ButtonComponent
        disable={true}
        className={
          "fixed sm:hidden rounded-lg py-3 h-12 bottom-2 left-1/2 transform -translate-x-1/2 w-11/12"
        }
        type={"primary"}
        size={"md"}
        children={"Tiếp tục"}
      />
    </div>
  );
};

export default OrderFood;
