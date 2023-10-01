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
          <div className="flex space-x-12">
            <div className="flex flex-col space-y-2">
              <span className="text-white hover:text-primary transition-colors">
                Về chúng tôi
              </span>
              <span className="text-white hover:text-primary transition-colors">
                Thực đơn
              </span>
              <span className="text-white hover:text-primary transition-colors">
                Dịch vụ
              </span>
              <span className="text-white hover:text-primary transition-colors">
                Giao hàng
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-white hover:text-primary transition-colors">
                Hỗ trợ
              </span>
              <span className="text-white hover:text-primary transition-colors">
                Đặt câu hỏi
              </span>
              <span className="text-white hover:text-primary transition-colors">
                Đặt món
              </span>
              <span className="text-white hover:text-primary transition-colors">
                Liên hệ
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <a
                href="URL của Facebook"
                className="text-white hover:text-primary transition-colors flex items-center"
              >
                <FaFacebook className="w-5 h-5 mr-1" />
                Facebook
              </a>
              <a
                href="URL của Instagram"
                className="text-white hover:text-primary transition-colors flex items-center"
              >
                <FaInstagram className="w-5 h-5 mr-1" />
                Instagram
              </a>
              <a
                href="URL của Twitter"
                className="text-white hover:text-primary transition-colors flex items-center"
              >
                <FaTwitter className="w-5 h-5 mr-1" />
                Twitter
              </a>
              <a
                href="URL của Youtube"
                className="text-white hover:text-primary transition-colors flex items-center"
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

          <div className="flex justify-end items-center space-x-6">
            <a
              href="URL của Chính sách bảo mật"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              Chính sách bảo mật
            </a>
            <a
              href="URL của Điều khoản sử dụng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              Điều khoản sử dụng
            </a>
            <a
              href="URL của Định giá"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              Định giá
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
