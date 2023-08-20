import React from 'react';
import KingCrabPNG from '../assets/images/product/king-crab-food.png'
import {HiMinus, HiPlus} from "react-icons/hi2";

const FoodCard = () => {
    return (
        <div className="w-auto h-auto grid grid-rows-2 sm:grid-rows-5 m-auto rounded-lg border drop-shadow-md">
            <div className="h-full row-span-1 sm:row-span-3">
                <img
                    className="w-full h-full aspect-video rounded-t-lg"
                    src={KingCrabPNG}
                    alt=""
                />
            </div>
            <div className="py-2 sm:py-4 px-2 bg-white rounded-b-lg row-span-1 sm:row-span-2 grid grid-cols-3">
                <div className="flex flex-col justify-around sm:justify-normal sm:gap-2 col-span-2 text-slate-800">
                    <span className="textbase sm:text-lg xl:text-2xl font-medium">Cua hoàng đế</span>
                    <span className="text-xs text-slate-500 md:text-sm xl:text-base">100.000 VNĐ</span>
                    <div className="flex justify-between items-center w-7/12">
                        <button><HiMinus className="w-3 h-3 sm:w-4 sm:h-4"/></button>
                        <span className="text-slate-500 text-sm">1</span>
                        <button><HiPlus className="w-3 h-3 sm:w-4 sm:h-4"/></button>
                    </div>
                </div>
                <div className="flex items-center justify-center col-span-1">
                    <input type="checkbox" className="w-5 h-5 accent-blue-300 focus:accent-blue-500"/>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;