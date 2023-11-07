import { FaFileInvoiceDollar } from "react-icons/fa6";
import { PiFishSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ScrollToTop } from "../../utils/format";
import { useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating/Rating.jsx";
import {CallStaff} from "../../components/index.js";

const Service = () => {
  const navigate = useNavigate();
  const customerName = useSelector((state) => state.customerName);
  const [ratingModal, setRatingModal] = useState(false);
  const idTable = customerName.tables[0];

  return (
    <div className="relative text-slate-800 pb-24 mt-24 lg:mt-0 pt-1 px-6 lg:px-16">
      <ScrollToTop />
      {/* Header */}
      <div className="flex flex-col mt-8 space-y-6">
        <div className="w-full min-h-fit lg:h-[450px] rounded-lg">
          <img
            className="w-full h-full rounded-lg object-cover"
            src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1699338283/NhaHangThuyTinh/qoj52hlvylu0hybn1em0.webp"
            alt=""
          />
        </div>
        {/* Service */}
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => navigate(`/tables-${idTable}/order`)}
            className="box-border cursor-pointer bg-[#803B20] p-2 rounded-lg flex transition-all duration-300 text-white flex-col items-center justify-center drop-shadow space-y-2 border-2 border-transparent hover:bg-white hover:border-[#803B20] hover:text-[#803B20] active:bg-white active:border-[#803B20] active:text-[#803B20]"
          >
            <FaFileInvoiceDollar className="w-10 h-10 rounded-lg text-white bg-orange-400 p-2" />
            <span className="text-xs">Thanh toán</span>
          </div>
          <div
            onClick={() => setRatingModal(true)}
            className="box-border cursor-pointer bg-[#803B20] p-2 rounded-lg flex transition-all duration-300 text-white flex-col items-center justify-center drop-shadow space-y-2 border-2 border-transparent hover:bg-white hover:border-[#803B20] hover:text-[#803B20] active:bg-white active:border-[#803B20] active:text-[#803B20]"
          >
            <FaFileInvoiceDollar className="w-10 h-10 rounded-lg text-white bg-green-500 p-2" />
            <span className="text-xs">Đánh giá</span>
          </div>
          <Rating ratingModal={ratingModal} setRatingModal={setRatingModal} />
        </div>
        {/* Button Order */}
        <div
          onClick={() => navigate(`/tables-${idTable}/menu`)}
          className="cursor-pointer w-full bg-primary hover:bg-primary/80 transition-colors duration-200 active:bg-primary/80 h-16 rounded-lg flex items-center justify-center px-4 text-white space-x-8 drop-shadow-xl"
        >
          <PiFishSimpleBold className="w-10 h-10 bg-orange-800 bg-opacity-60 p-2 rounded" />
          <span className="font-medium">Xem thực đơn - Gọi món</span>
        </div>
      </div>
      <CallStaff />
    </div>
  );
};

export default Service;
