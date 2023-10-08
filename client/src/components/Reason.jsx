import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { truncateString } from "../utils/format.js";

const AboutUs = () => {
  return (
    <div className="max-w-screen-xl lg:mx-16 my-12">
      <h1 className="text-4xl font-bold text-primary pb-4">
        Tại sao bạn chọn chúng tôi
      </h1>
      <p className="text-gray-500 text-sm w-2/4">
        Nhà hàng Thuỷ Tinh là lựa chọn tuyệt vời khi có đầy đủ các dịch vụ dành
        cho khách hàng thân yêu của chúng tôi.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        <div className="bg-white transform transition duration-300 hover:shadow-lg rounded-xl border">
          <div className="overflow-hidden rounded-t-xl h-[220px]">
            <img
              className="w-full h-full object-cover transform transition duration-300 hover:scale-105"
              src="https://i.pinimg.com/564x/c2/7a/c8/c27ac8fc11dcec58f09e8a6c72306b12.jpg"
              alt=""
            />
          </div>
          <div className="p-6 flex flex-col">
            <div className="flex space-x-3 items-center justify-left">
              <div className="p-2 bg-primary rounded-full flex">
                <BsBookmarkCheckFill className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 overflow-hidden whitespace-nowrap">
                Đặt bàn online
              </h2>
            </div>
            <p className="py-4 text-sm text-gray-500">
              {truncateString(
                "Nếu bạn muốn có sự chuẩn bị tốt nhất cho một cuộc hẹn, bạn không thể thiếu sự chuẩn bị trước cho việc đặt bàn tại nhà hàng của chúng tôi.",
                130,
              )}
            </p>
            <button className="w-full bg-primary text-white rounded-full px-4 py-2 hover:bg-[#F0A500E5] transition duration-300 ease-in-out hover:scale-105">
              Xem Menu
            </button>
          </div>
        </div>
        <div className="bg-white transform transition duration-300 hover:shadow-lg rounded-xl border">
          <div className="overflow-hidden rounded-t-xl h-[220px]">
            <img
              className="w-full h-full object-cover transform transition duration-300 hover:scale-105"
              src="https://i.pinimg.com/564x/05/c6/c8/05c6c85f82792c133c3b11f90981a608.jpg"
              alt=""
            />
          </div>
          <div className="p-6 flex flex-col">
            <div className="flex space-x-3 items-center justify-left">
              <div className="p-2 bg-primary rounded-full flex">
                <FaShippingFast className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 overflow-hidden whitespace-nowrap">
                Giao hàng tận nơi
              </h2>
            </div>
            <p className="py-4 text-sm text-gray-500">
              {truncateString(
                "Bạn không cần phải tốn công đến nhà hàng để đặt món, nhà hàng Thuỷ Tinh sẽ cung cấp dịch vụ giao hàng tận nơi đến cho quý khách hàng.",
                130,
              )}
            </p>
            <button className="w-full bg-primary text-white rounded-full px-4 py-2 hover:bg-[#F0A500E5] transition duration-300 ease-in-out hover:scale-105">
              Xem Menu
            </button>
          </div>
        </div>
        <div className="bg-white transform transition duration-300 hover:shadow-lg rounded-xl border">
          <div className="overflow-hidden rounded-t-xl h-[220px]">
            <img
              className="w-full h-full object-cover transform transition duration-300 hover:scale-105"
              src="https://i.pinimg.com/564x/59/ec/57/59ec57e404a50d019f367f2c3124b90e.jpg"
              alt=""
            />
          </div>
          <div className="p-6 flex flex-col">
            <div className="flex space-x-3 items-center justify-left">
              <div className="p-2 bg-primary rounded-full flex">
                <RiServiceFill className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 overflow-hidden whitespace-nowrap">
                Chăm sóc khách hàng
              </h2>
            </div>
            <p className="py-4 text-sm text-gray-500 ">
              {truncateString(
                "Nhà hàng Thuỷ Tinh luôn đặt khách hàng trong tim. Chúng tôi khẳng định sẽ tận tâm, lắng nghe và phục vụ khách hàng bằng những gì mình có.",
                130,
              )}
            </p>
            <button className="w-full bg-primary text-white rounded-full px-4 py-2 hover:bg-[#F0A500E5] transition duration-300 ease-in-out hover:scale-105">
              Xem Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
