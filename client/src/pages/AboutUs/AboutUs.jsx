import Reason from "../../components/Reason.jsx";
import product from "../../assets/images/product.png";

const AboutUs = () => {
  return (
    <div className="py-24">
      <section className="relative mt-[-20px] h-96 w-full bg-cover bg-center bg-gray-300 bg-[url('https://i.pinimg.com/564x/c2/7a/c8/c27ac8fc11dcec58f09e8a6c72306b12.jpg')]">
        <div className="flex flex-col items-center justify-center absolute inset-0 bg-black bg-opacity-40">
          <div className="text-center text-gray-200 w-1/3">
            <h1 className=" text-4xl md:text-5xl font-semibold text-gray-200">
              Về Chúng Tôi
            </h1>
            <p className="mt-4 text-base opacity-80">
              Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
              việc trình bày và dàn trang
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-6">
            <button
              type="submit"
              className="hover:bg-[#F0A500E5] transition-colors duration-300 w-full md:w-24 py-2 text-base bg-orange-500 text-white rounded-xl focus:outline-none focus:ring focus:ring-orange-500"
            >
              Đặt món
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f2e5e5] flex flex-col justify-center items-center">
        <div className="max-w-screen-xl mx-auto my-12 px-6 ">
          <h2 className="text-5xl text-center text-primary w-full font-semibold mb-4">
            Chuyên các món hải sản
          </h2>
          <div className="mt-10 mb-28 w-full flex flex-col md:flex-row">
            <div className="flex-1 pr-4">
              <h2 className="text-4xl font-semibold mb-2 text-primary">
                Tôm hùm Khánh Hoà
              </h2>
              <p className="text-gray-700 w-2/3 opacity-60 pt-2 leading-7">
                Khi nhắc đến địa điểm nuôi trồng thủy hải sản nói chung và tôm
                hùm nói riêng thì sẽ thật là thiếu sót khi mà chúng ta không
                nhắc tới Khánh Hòa. Đây là một tỉnh có sản lượng tôm hùm và lồng
                nuôi tôm dẫn đầu cả nước với khoảng 880 tấn tôm mỗi vụ và 28.500
                lồng nuôi.
              </p>
              <button
                type="submit"
                className="mt-6 hover:bg-[#F0A500E5] transition-colors duration-300 w-full md:w-24 py-2 text-base bg-orange-500 text-white rounded-xl focus:outline-none focus:ring focus:ring-orange-500"
              >
                Đặt món
              </button>
            </div>
            <div className="flex-1 relative">
              <img
                src={product}
                alt=""
                className="z-10 w-2/3 rounded absolute right-0"
              />
              <div className="w-2/3 h-full bg-[#F0A500E5] opacity-20 absolute left-32 top-1/4"></div>
            </div>
          </div>
        </div>
      </section>

      <Reason />
    </div>
  );
};

export default AboutUs;
