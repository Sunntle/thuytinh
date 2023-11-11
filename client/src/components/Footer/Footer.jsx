import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#783F27] px-16 py-12 hidden lg:block text-white/80 min-h-0">
      <div className="max-w-screen-3xl">
        <div className="grid grid-cols-12 content-stretch">
          <div className="col-span-5 h-full flex flex-col justify-between space-y-40">
            <span className="text-2xl font-semibold">Logo Here</span>
            <span className="text-[#BEB7B5]">
              © 2023 Thuy Tinh. All rights reserved
            </span>
          </div>
          <div className="col-span-7 lg:grid lg:grid-cols-3 justify-items-end">
            {/*Col 1*/}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
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
              <a className="cursor-pointer text-white hover:text-primary transition-colors">
                Chính sách bảo mật
              </a>
            </div>
            {/*Col 2*/}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
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
              <a className="cursor-pointer text-white hover:text-primary transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
            {/*Col 3*/}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
                <a
                  href="#"
                  className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
                >
                  <FaFacebook className="w-5 h-5 mr-1" />
                  Facebook
                </a>
                <a
                  href="#"
                  className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
                >
                  <FaInstagram className="w-5 h-5 mr-1" />
                  Instagram
                </a>
                <a
                  href="#"
                  className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
                >
                  <FaTwitter className="w-5 h-5 mr-1" />
                  Twitter
                </a>
                <a
                  href="#"
                  className="cursor-pointer text-white hover:text-primary transition-colors flex items-center"
                >
                  <FaYoutube className="w-5 h-5 mr-1" />
                  Youtube
                </a>
              </div>
              <a className="cursor-pointer text-white hover:text-primary transition-colors">
                Định giá
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
