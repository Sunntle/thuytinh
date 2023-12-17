import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "../../components/Image/Image.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const customerName = useSelector((state) => state.customerName);
  return (
    <footer className="bg-[#783F27] px-16 py-12 hidden lg:block text-white/80 min-h-0">
      <div className="max-w-screen-3xl">
        <div className="grid grid-cols-12 content-stretch">
          <div className="col-span-5 h-full flex flex-col justify-between space-y-40">
            <Link to={"/home"} className="w-32 h-32">
              <Image
                src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1700287585/NhaHangThuyTinh/msmn9zmjne9fkkakyn5k.webp"
                alt="white-logo"
              />
            </Link>
            <span className="text-[#BEB7B5]">
              © 2023 Thuy Tinh. All rights reserved
            </span>
          </div>
          <div className="col-span-7 lg:grid lg:grid-cols-3 justify-items-end">
            {/*Col 1*/}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
                <Link
                  to={"/about"}
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                >
                  Về chúng tôi
                </Link>
                <Link
                  to={
                    customerName?.tables.length > 0
                      ? `/tables-${customerName?.tables}/menu`
                      : "/select-table"
                  }
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                >
                  Thực đơn
                </Link>
                <Link
                  to={
                    customerName?.tables.length > 0
                      ? `/tables-${customerName?.tables}/service`
                      : "/select-table"
                  }
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                >
                  Dịch vụ
                </Link>
                <Link
                  to={"/"}
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                >
                  Giao hàng
                </Link>
              </div>
              <Link className="cursor-pointer text-white hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
            {/*Col 2*/}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
                <Link
                  to={
                    customerName?.tables.length > 0
                      ? `/tables-${customerName?.tables}/contact`
                      : "/contact"
                  }
                  className="cursor-pointer text-white hover:text-primary transition-colors"
                >
                  Hỗ trợ
                </Link>
                <Link
                  to={
                    customerName?.tables.length > 0
                      ? `/tables-${customerName?.tables}/contact`
                      : "/contact"
                  }
                  className="cursor-pointer text-white hover:text-primary transition-colors"
                >
                  Đặt câu hỏi
                </Link>
                <Link
                  to={
                    customerName?.tables.length > 0
                      ? `/tables-${customerName?.tables}/menu`
                      : "/select-table"
                  }
                  className="cursor-pointer text-white hover:text-primary transition-colors"
                >
                  Đặt món
                </Link>
                <Link
                  to={
                    customerName?.tables.length > 0
                      ? `/tables-${customerName?.tables}/contact`
                      : "/contact"
                  }
                  className="cursor-pointer text-white hover:text-primary transition-colors"
                >
                  Liên hệ
                </Link>
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
