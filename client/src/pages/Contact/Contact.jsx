import { SiContactlesspayment } from "react-icons/si";
import {Helmet} from "react-helmet";

const Contact = () => {
  return (
    <div className="lg:py-24 mt-24 lg:mt-0 pb-24 relative flex flex-col justify-center items-center min-h-screen bg-white lg:px-16">

      <Helmet>
        <title>Liên hệ</title>
        <meta name="contact" content="Contact" />
      </Helmet>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 justify-center items-center lg:border rounded shadow-md ">
        <form className="col-span-2 grid grid-cols-1 gap-4 w-full h-full p-6">
          <h2 className="text-center text-primary text-3xl font-bold pb-4">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h2>
          <div className="space-y-6">
            <input
              type="text"
              name="username"
              className="outline-none bg-[#f3f4f6] rounded w-full text-sm p-[10px]"
              placeholder="Nhập tên"
            />
            <input
              type="email"
              name="email"
              className="outline-none bg-[#f3f4f6] rounded w-full text-sm p-[10px]"
              placeholder="Nhập email"
            />
            <input
              type="phone"
              name="phone"
              className="outline-none bg-[#f3f4f6] rounded w-full text-sm p-[10px]"
              placeholder="Nhập số điện thoại"
            />
            <textarea
              name="message"
              rows="7"
              cols="50"
              className="outline-none bg-[#f3f4f6] rounded w-full text-sm p-[10px] resize-none "
              placeholder="Nhập nội dung"
            ></textarea>
          </div>
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="hover:bg-[#F0A500E5] transition-colors duration-300 w-full md:w-1/4 p-2 bg-orange-500 text-white rounded focus:outline-none focus:ring focus:ring-orange-500"
            >
              Gửi
            </button>
          </div>
        </form>
        <div className="w-full h-full bg-[#fbeed6] flex flex-col justify-center items-center py-10 md:py-0">
          <div className="flex flex-col justify-center items-center w-32 h-32 text-primary bg-white rounded-full border-2 border-primary ">
            <SiContactlesspayment size={64} className="" />
          </div>

          <div className="w-full flex flex-col justify-center items-center mt-4">
            <p className="text-primary font-light text-center w-2/3">
              Nếu bạn có thắc mắc hoặc muốn liên lạc, hãy sử dụng mẫu dưới đây.
              Chúng tôi mong chờ tin từ bạn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
