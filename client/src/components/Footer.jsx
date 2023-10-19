import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

  return (
    <footer className="bg-gray-800 px-16 py-12 hidden lg:block">
      <div className="max-w-screen-xl">
        <div className="flex pb-8">
          <div className="flex flex-grow">
            <h1 className="text-2xl text-white font-semibold">Logo Here</h1>
          </div>
          <div className="flex space-x-24">
            <div className="flex flex-col space-y-2">
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                Về chúng tôi
              </span>
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                Thực đơn
              </span>
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                Dịch vụ
              </span>
              <span className="text-white hover:text-primary transition-colors cursor-pointer">
                Giao hàng
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="cursor-pointer text-white hover:text-primary transition-colors">
                Hỗ trợ
              </span>
              <span className="cursor-pointer text-white hover:text-primary transition-colors">
                Đặt câu hỏi
              </span>
              <span className="cursor-pointer text-white hover:text-primary transition-colors">
                Đặt món
              </span>
              <span className="cursor-pointer text-white hover:text-primary transition-colors">
                Liên hệ
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <a
                href="URL của Facebook"
                className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
              >
                <FaFacebook className="w-5 h-5 mr-1" />
                Facebook
              </a>
              <a
                href="URL của Instagram"
                className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
              >
                <FaInstagram className="w-5 h-5 mr-1" />
                Instagram
              </a>
              <a
                href="URL của Twitter"
                className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
              >
                <FaTwitter className="w-5 h-5 mr-1" />
                Twitter
              </a>
              <a
                href="URL của Youtube"
                className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
              >
                <FaYoutube className="w-5 h-5 mr-1" />
                Youtube
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center pt-8">
          <div className="flex flex-grow">
            <span className="text-gray-500">
              © 2023 Thuy Tinh. All rights reserved
            </span>
          </div>
          <div className="flex justify-end items-center space-x-16">
            <a className="cursor-pointer text-white hover:text-primary transition-colors">
              Chính sách bảo mật
            </a>
            <a className="cursor-pointer text-white hover:text-primary transition-colors">
              Điều khoản sử dụng
            </a>
            <a className="cursor-pointer text-white hover:text-primary transition-colors">
              Định giá
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
