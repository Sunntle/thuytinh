import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { parseQueryString } from "../../utils/format.js";
import moment from "moment";

const Booked = () => {
  const location = useLocation();
  const parsedQueryParams = parseQueryString(location.search);
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1; // Giảm thời gian còn lại mỗi giây nếu vẫn còn thời gian
        }
        return 0; // Nếu hết thời gian, dừng đếm ngược
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="py-24 text-slate-500 tracking-wide max-w-full w-screen min-h-screen bg-[url('https://images.unsplash.com/photo-1699148689335-16a572d22c22?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center">
      <div className="mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 min-h-fit bg-white rounded p-4">
        <span className="block text-center text-xl font-medium text-primary uppercase">
          Xin vui lòng kiểm tra thông tin
        </span>
        <span className="block text-center">
          Thời gian đặt bàn: {formatTime(timeLeft)}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base mt-8">
          <div className="flex justify-between items-center border-b pb-1">
            <span>Số bàn: </span>
            <span>{parsedQueryParams?.tables}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-1">
            <span>Vị trí: </span>
            <span>{parsedQueryParams?.position === 'in' ? 'Trong nhà' : 'Ngoài trời'}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-1">
            <span>Số người: </span>
            <span>{parsedQueryParams?.party_size}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-1">
            <span>Thời gian: </span>
            <span>{moment(parsedQueryParams.createdAt, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm ")}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-12">
          <div className="w-full flex flex-col">
            <label htmlFor="name">Họ tên</label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="phone">Đề xuất với nhà hàng (không bắt buộc )</label>
            <textarea
              rows={5}
              id="phone"
              name="note"
              className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
            />
          </div>
          <div className="w-full h-full tracking-wide">
            <button
              type={"submit"}
              // onClick={fetchTable}
              className="flex justify-center items-center whitespace-nowrap w-full h-full tracking-wide bg-primary rounded py-2 md:text-sm text-white font-medium"
            >
              Đặt bàn
            </button>
          </div>
          <span className="cursor-pointer text-center block text-sm text-slate-500 hover:text-primary transition-colors duration-200">Chọn bàn khác</span>
        </div>
      </div>
    </div>
  );
};

export default Booked;
