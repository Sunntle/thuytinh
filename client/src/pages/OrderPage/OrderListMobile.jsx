import React from 'react';
import {FiChevronLeft} from "react-icons/fi";
import {HiOutlineClipboardCheck} from "react-icons/hi";
import {HiTrash, HiXMark} from "react-icons/hi2";
import KingCrabPNG from "../../assets/images/product/king-crab-food.png"
import ButtonComponent from "../../components/ButtonComponent.jsx";

const OrderFoodCard = () => {
    return (
            <div className="h-32 sm:h-auto w-full border rounded-lg flex justify-between items-center drop-shadow-md space-x-3 overflow-hidden">
                <div className="h-full w-5/12 overflow-hidden">
                    <img
                        className="w-full h-full rounded-l-lg"
                        src={KingCrabPNG}
                        alt=""
                    />
                </div>
                <div className="h-full w-7/12 overflow-hidden">
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
    )
}

const OrderListMobile = () => {
    return (
        <div className="w-12/12 h-screen text-slate-800">
            <div className="sm:hidden h-full relative">
                <div className="space-y-12 p-4">
                    <div className="flex justify-between items-center">
                        <button>
                            <FiChevronLeft className="w-6 h-6" />
                        </button>
                        <span className="text-xl font-medium uppercase">Chọn món</span>
                        <button>
                            <HiTrash className="w-6 h-6 text-red-500" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        <OrderFoodCard />
                        <OrderFoodCard />
                        <OrderFoodCard />
                        <OrderFoodCard />
                        <OrderFoodCard />
                        <OrderFoodCard />
                        <OrderFoodCard />
                        <OrderFoodCard />
                    </div>
                </div>
                <div className="fixed z-40 bottom-0 h-28 w-full border-t bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
                    <div className="h-full p-2 flex flex-col justify-between">
                        <div className="flex mt-2 justify-between items-center text-slate-600">
                            <span className="text-lg font-bold">Tổng cộng</span>
                            <span className="font-medium">140.000 VNĐ</span>
                        </div>
                        <ButtonComponent className="w-full h-auto py-2 rounded font-medium"  size={'md'} type={'primary'}  children={'Tiếp tục'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderListMobile;