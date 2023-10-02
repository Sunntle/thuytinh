import React from 'react';
import panda from "../../assets/images/panda.png";
import banner from "../../assets/images/banner.jpg"
import {FaFileInvoiceDollar} from "react-icons/fa6";
import {PiFishSimpleBold} from "react-icons/pi";
import {HiOutlineBellAlert} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header.jsx";
import CallStaff from "../../components/CallStaff.jsx";

const Service = () => {
    const navigate = useNavigate()
    return (
        <div className="relative text-slate-800 pb-24 lg:py-24">
            {/* Header */}
            <div className="flex flex-col px-6 mt-8 space-y-6">
                <div className="w-full h-44 lg:h-[450px] rounded-lg">
                    <img
                        className="w-full h-full rounded-lg object-fill"
                        src={banner}
                        alt=""
                    />
                </div>
                {/* Service */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-2 rounded-lg flex active:bg-slate-100 flex-col items-center justify-center drop-shadow space-y-2">
                        <FaFileInvoiceDollar className="w-10 h-10 rounded-lg text-white bg-orange-400 p-2"/>
                        <span className="text-xs text-slate-500">Thanh toán</span>
                    </div>
                    <div onClick={() => navigate('/rating')} className="bg-slate-50 p-2 rounded-lg flex active:bg-slate-100 flex-col items-center justify-center drop-shadow space-y-2">
                        <FaFileInvoiceDollar className="w-10 h-10 rounded-lg text-white bg-green-500 p-2"/>
                        <span className="text-xs text-slate-500">Đánh giá</span>
                    </div>
                </div>
                {/* Button Order */}
                <div onClick={() => navigate('/menu')} className="w-full bg-primary active:bg-opacity-80 h-16 rounded-lg flex items-center justify-center px-4 text-white space-x-8 drop-shadow-xl">
                    <PiFishSimpleBold className="w-10 h-10 bg-orange-800 bg-opacity-60 p-2 rounded"/>
                    <span className="font-medium">Xem thực đơn - Gọi món</span>
                </div>
            </div>
            <CallStaff />
        </div>
    );
};

export default Service;