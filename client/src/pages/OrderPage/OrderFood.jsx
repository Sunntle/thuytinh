import React, { useRef, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { HiMenu, HiOutlineClipboardCheck } from "react-icons/hi";
import ButtonComponent from "../../components/ButtonComponent.jsx";
import FoodCard from "../../components/FoodCard.jsx";
import SidebarMobile from "./SidebarMobile.jsx";
import SidebarTablet from "./SidebarTablet.jsx";
import crabCute from "../../assets/images/product/crab.png";
import { GiSadCrab, GiShrimp } from "react-icons/gi";
import { LiaFishSolid } from "react-icons/lia";
import { motion } from "framer-motion";

const OrderFood = () => {
  // Ref Food
  const crabRef = useRef(null);
  const shrimpRef = useRef(null);
  const fishRef = useRef(null);

  const sections = [
    { ref: crabRef, icon: <GiSadCrab className="w-6 h-6 text-primary" /> },
    { ref: shrimpRef, icon: <GiShrimp className="w-6 h-6 text-red-600" /> },
    { ref: fishRef, icon: <LiaFishSolid className="w-6 h-6 text-blue-600" /> },
  ];

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hook
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-12/12 h-screen text-slate-800">
      <div className="sm:hidden">
        <div className="space-y-5 p-4">
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
        <SidebarMobile
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
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
      {/* Layout Tablet */}
      <div className="grid grid-cols-12 gap-2">
        {/*Sidebar Left Content*/}
        <div className="col-span-4 lg:col-span-3 border-r">
          <SidebarTablet />
        </div>
        {/* Main Content */}
        <div className="col-span-7 lg:col-span-8 border-x">
          <div className="p-4 w-full max-h-screen overflow-y-auto">
            {/* Filter */}
            <div className="w-full h-16 bg-slate-200 mb-8"></div>
            {/* List Product */}
            {/* Cua */}
            <div className="flex flex-col mb-10">
              <div
                ref={crabRef}
                className="flex justify-center items-center text-slate-800 mb-10"
              >
                <span className="w-full h-1 rounded bg-slate-500"></span>
                <span className="text-xl font-bold text-center mx-5">CUA</span>
                <span className="w-full h-1 rounded bg-slate-500"></span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
              </div>
            </div>
            {/* Tom */}
            <div className="flex flex-col mb-10">
              <div
                ref={shrimpRef}
                className="flex justify-center items-center text-slate-800 mb-10"
              >
                <span className="w-full h-1 rounded bg-slate-500"></span>
                <span className="text-xl font-bold text-center mx-5">TÔM</span>
                <span className="w-full h-1 rounded bg-slate-500"></span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
              </div>
            </div>
            {/*  Ca */}
            <div className="flex flex-col">
              <div
                ref={fishRef}
                className="flex justify-center items-center text-slate-800 mb-10"
              >
                <span className="w-full h-1 rounded bg-slate-500"></span>
                <span className="text-xl font-bold text-center mx-5">Cá</span>
                <span className="w-full h-1 rounded bg-slate-500"></span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar Right Content */}
        <div className="col-span-1 h-full flex flex-col justify-center">
          {/*<div className="flex flex-col items-center">*/}
          <motion.div
            initial={{ y: -800 }}
            animate={{ y: 0 }}
            transition={{
              delay: 1,
              duration: 1,
              damping: 40,
            }}
          >
            {sections.map((section, index) => (
              <div className="flex flex-col items-center" key={index}>
                <div
                  onTouchStart={() => scrollToSection(section.ref)}
                  className="w-12 h-12 bg-transparent border border-slate-400 rounded-full flex justify-center items-center text-white"
                >
                  {section.icon}
                </div>
                <div className="w-0.5 font-thin h-10 bg-black"></div>
              </div>
            ))}
            <div className="relative min-w-fit -m-2 right-1">
              <img className="w-full h-full" src={crabCute} alt="" />
            </div>
          </motion.div>
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default OrderFood;
