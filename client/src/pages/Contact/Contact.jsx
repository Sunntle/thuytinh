import React from "react";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="py-24 relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-gray-300 bg-[url('https://static.thehoneycombers.com/wp-content/uploads/sites/2/2022/03/sydney-restaurants-woodcut-900x643.png')]">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="text-white text-center z-10 flex flex-col justify-center items-center space-y-4 mb-10">
        <h2 className="text-4xl font-bold pt-10">LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <span className="flex justify-center items-center">
          <BsTelephone className="mr-2" />
          Phone: 0392262423.
        </span>
        <span className="flex justify-center items-center">
          <MdOutlineMail className="mr-2" />
          Email: thuytinh2023@gmail.com.
        </span>
        <span className="flex justify-center items-center">
          <FaLocationDot className="mr-2 " />
          Địa chỉ: Công viên phần mềm Quang Trung, Quốc lộ 1A, P. Tân Chánh
          Hiệp, Q. 12, Tp. Hồ Chí Minh.
        </span>
      </div>
      <form className="z-10 w-2/3 h-2/3 p-10 bg-transparent shadow-md sm:bg-white sm:bg-opacity-25">
        <div className="space-y-6 md:space-y-0 grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="space-y-6 relative mr-0 md:mr-6">
            <input
              type="text"
              name="username"
              className="w-full text-sm p-2 focus:outline-none border border-gray-300 focus-within:border-orange-500 rounded-sm focus:border-orange-500 bg-gray-100"
              placeholder="Nhập tên"
            />
            <input
              type="email"
              name="email"
              className="w-full text-sm p-2 focus:outline-none border border-gray-300 focus-within:border-orange-500 rounded-sm focus:border-orange-500 bg-gray-100"
              placeholder="Nhập email"
            />
            <input
              type="phone"
              name="phone"
              className="w-full text-sm p-2 focus:outline-none border border-gray-300 focus-within:border-orange-500 rounded-sm focus:border-orange-500 bg-gray-100"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="relative">
            <textarea
              type="textarea"
              name="message"
              rows="7"
              cols="50"
              className="w-full h-full text-sm p-2 focus:outline-none border border-gray-300 focus-within:border-orange-500 rounded-sm focus:border-orange-500 bg-gray-100"
              placeholder="Nhập nội dung"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-6">
          <button
            type="submit"
            className="hover:bg-[#F0A500E5] transition-colors duration-300 w-full md:w-1/4 p-2 bg-orange-500 text-white rounded focus:outline-none focus:ring focus:ring-orange-500"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
