import banner from "../../assets/images/banner.jpg";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { PiFishSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { CallStaff } from "../../components/index.js";
import { ScrollToTop } from "../../utils/format";
import { useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating.jsx";

const Service = () => {
  const navigate = useNavigate();
  const customerName = useSelector((state) => state.customerName);
  const [ratingModal, setRatingModal] = useState(false);
  const idTable = customerName.tables[0];

  return (
    <div className="relative text-slate-800 pb-24 mt-24 lg:mt-0 lg:pt-12 px-6 lg:px-16">
      <ScrollToTop />
      {/* Header */}
      <div className="flex flex-col mt-8 space-y-6">
        <div className="w-full h-44 lg:h-[450px] rounded-lg">
          <img
            className="w-full h-full rounded-lg object-fill"
            src={banner}
            alt=""
          />
        </div>
        {/* Service */}
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => navigate(`/tables-${idTable}/order`)}
            className="cursor-pointer bg-slate-50 p-2 rounded-lg flex hover:bg-slate-100 transition-colors duration-200 active:bg-slate-100 flex-col items-center justify-center drop-shadow space-y-2"
          >
            <FaFileInvoiceDollar className="w-10 h-10 rounded-lg text-white bg-orange-400 p-2" />
            <span className="text-xs text-slate-500">Thanh toán</span>
          </div>
          <div
            onClick={() => setRatingModal(true)}
            className="cursor-pointer bg-slate-50 p-2 rounded-lg flex hover:bg-slate-100 transition-colors duration-200 active:bg-slate-100 flex-col items-center justify-center drop-shadow space-y-2"
          >
            <FaFileInvoiceDollar className="w-10 h-10 rounded-lg text-white bg-green-500 p-2" />
            <span className="text-xs text-slate-500">Đánh giá</span>
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
