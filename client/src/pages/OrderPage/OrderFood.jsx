import React, {useRef, useState} from "react";
import {FiChevronLeft} from "react-icons/fi";
import {HiMenu, HiOutlineClipboardCheck} from "react-icons/hi";
import ButtonComponent from "../../components/ButtonComponent.jsx";
import FoodCard from "../../components/FoodCard.jsx";
import SidebarMobile from "./SidebarMobile.jsx";
import SidebarTablet from "./SidebarTablet.jsx";
import crabCute from "../../assets/images/product/crab.png";
import {GiSadCrab, GiShrimp} from "react-icons/gi";
import {LiaFishSolid} from "react-icons/lia";
import {motion} from "framer-motion";
import {MdMenuBook} from "react-icons/md";
import {HiXMark} from "react-icons/hi2";
import KingCrabPNG from "../../assets/images/product/king-crab-food.png";

const OrderFood = () => {
    // Ref Food
    const crabRef = useRef(null);
    const shrimpRef = useRef(null);
    const fishRef = useRef(null);

    const sections = [
        {ref: crabRef, icon: <GiSadCrab className="w-8 h-8 text-primary"/>},
        {ref: shrimpRef, icon: <GiShrimp className="w-8 h-8 text-red-600"/>},
        {ref: fishRef, icon: <LiaFishSolid className="w-8 h-8 text-blue-600"/>},
    ];

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({behavior: "smooth"});
        }
    };

    // Hook
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOrderListOpen, setIsOrderListOpen] = useState(false)

    const OrderList_Animation = {
        open: {
            opacity: 100
        },
        closed: {
            opacity: 0
        }
    }

    return (
        <div className="w-12/12 h-screen text-slate-800">
            <div className="sm:hidden">
                <div className="space-y-5 p-4">
                    <div className="flex justify-between items-center">
                        <button>
                            <FiChevronLeft className="w-6 h-6"/>
                        </button>
                        <span className="text-xl font-bold uppercase">Chọn món</span>
                        <button>
                            <HiOutlineClipboardCheck className="w-6 h-6"/>
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
                            <HiMenu className="w-4 h-4"/>
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
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                            </div>
                        </div>
                        {/*Món bán chạy nhất*/}
                        <div className="flex flex-col space-y-5">
              <span className="text-xl font-bold uppercase">
                Món bán chạy nhất
              </span>
                            <div className="grid grid-cols-2 gap-4">
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
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
            <div className="hidden sm:relative sm:grid sm:grid-cols-12 sm:gap-2">
                {/*Sidebar Left Content*/}
                <div className="col-span-4 lg:col-span-3 border-r">
                    <SidebarTablet/>
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
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
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
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                            </div>
                        </div>
                        {/* Ca */}
                        <div className="flex flex-col mb-10">
                            <div
                                ref={fishRef}
                                className="flex justify-center items-center text-slate-800 mb-10"
                            >
                                <span className="w-full h-1 rounded bg-slate-500"></span>
                                <span className="text-xl font-bold text-center mx-5">CÁ</span>
                                <span className="w-full h-1 rounded bg-slate-500"></span>
                            </div>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                                <FoodCard/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sidebar Right Content */}
                <div className="col-span-1 h-full flex flex-col justify-center">
                    {/*<div className="flex flex-col items-center">*/}
                    <motion.div
                        initial={{y: -800}}
                        animate={{y: 0}}
                        transition={{
                            delay: 1,
                            duration: 1,
                            damping: 40,
                        }}
                        className="flex flex-col jusitfy-between items-center space-y-48"
                    >
                        <div>
                            {sections.map((section, index) => (
                                <div
                                    className="flex flex-col items-center"
                                    key={index}
                                >
                                    <div
                                        onTouchStart={() => scrollToSection(section.ref)}
                                        className="w-12 h-12 lg:w-16 lg:h-16 bg-transparent border border-slate-400 rounded-full flex justify-center items-center text-white"
                                    >
                                        {section.icon}
                                    </div>
                                    <div className="w-0.5 font-thin h-10 bg-black"></div>
                                </div>
                            ))}
                            <div className="relative min-w-fit -m-2 right-1.5">
                                <img
                                    className="w-full h-full"
                                    src={crabCute}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div onTouchStart={() => setIsOrderListOpen(!isOrderListOpen)} className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-slate-500 flex items-center justify-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <MdMenuBook className="w-7 h-7 text-slate-500"/>
                        </div>
                    </motion.div>
                    {/*</div>*/}
                </div>
                {/* List Order Tablet */}
                <motion.div
                    className="fixed p-2 z-40 top-1/2 md:right-20 xl:right-32 transform -translate-y-1/2 bg-white md:h-[600px] xl:h-[800px] w-[500px] border rounded-lg shadow-xl"
                    variants={OrderList_Animation}
                    animate={isOrderListOpen ? 'open' : 'closed'}
                    initial={{opacity: 0}}
                >
                    {/* Close Button */}
                    <button onClick={() => setIsOrderListOpen(false)} className="mb-8"><HiXMark className="w-8 h-8"/></button>
                    {/* Food List */}
                    <div className="h-32 w-full border rounded-lg flex justify-between items-center drop-shadow-md space-x-3 overflow-hidden">
                        <div className="h-full w-4/12 overflow-hidden">
                            <img
                                className="w-full h-full rounded-l-lg"
                                src={KingCrabPNG}
                                alt=""
                            />
                        </div>
                        <div className="h-full w-8/12 overflow-hidden">
                            <div className="h-full flex justify-between items-start pt-2 pr-2">
                                <div className="flex flex-col space-y-3">
                                    <span className="font-medium text-lg">Cua Rang Me</span>
                                    <span className="text-sm text-slate-500">Số lượng: 1</span>
                                    <span className="font-medium text-sm">Giá: <span className="font-normal">1.400.000 VNĐ</span></span>
                                </div>
                                <button className="justify-start">
                                    <HiXMark className="w-6 h-6 text-red-500"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Button */}
                    <div className="fixed z-40 bottom-0 left-0 h-28 w-full border-t rounded-b-lg bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
                        <div className="h-full p-2 flex flex-col justify-between">
                            <div className="flex mt-2 justify-between items-center text-slate-600">
                                <span className="text-lg font-bold">Tổng cộng</span>
                                <span className="font-medium">140.000 VNĐ</span>
                            </div>
                            <ButtonComponent
                                className="w-full h-auto py-2 rounded font-medium"
                                size={'xl'}
                                type={'primary'}
                                children={'Tiếp tục'}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderFood;
