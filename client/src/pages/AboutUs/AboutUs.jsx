import Reason from "../../components/Reason.jsx";
import product from "../../assets/images/product.png";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useHttp from "../../hooks/useHttp.js";
import { formatCurrency, truncateString } from "../../utils/format.js";
import { socket } from "../../services/socket";
import { useParams } from "react-router-dom";

const AboutUs = () => {
  const [slideProduct, setSlideRating] = useState(null);
  const { sendRequest } = useHttp();
  const { slug } = useParams();
  console.log(slug);

  useEffect(() => {
    const request = {
      method: "get",
      url: "/rating",
    };
    sendRequest(request, setSlideRating);
  }, [sendRequest]);

  useEffect(() => {
    socket.emit("new rating", { userName: "Taile", role: "R1" });
  }, []);

  return (
    <div className="lg:py-24 pb-24">
      <section className="relative mt-[-20px] h-96 w-full bg-cover bg-center bg-gray-300 bg-[url('https://i.pinimg.com/564x/c2/7a/c8/c27ac8fc11dcec58f09e8a6c72306b12.jpg')]">
        <div className="flex flex-col items-center justify-center absolute inset-0 bg-black bg-opacity-40">
          <div className="text-center text-gray-200 w-2/3 lg:w-1/3">
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
              className="hover:bg-[#F0A500E5] transition-colors duration-300 w-1/4 md:w-24 py-2 text-base bg-orange-500 text-white rounded-xl focus:outline-none focus:ring focus:ring-orange-500"
            >
              Đặt món
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f2e5e5] flex flex-col justify-center items-center">
        <div className="my-12 px-16">
          <h2 className="text-5xl text-center text-primary w-full font-semibold mb-4">
            Chuyên các món hải sản
          </h2>
          <div className="mt-10 lg:mb-28 mb-0 w-full flex flex-col md:flex-row space-y-6 lg:space-y-0 text-center lg:text-left">
            <div className="flex-1">
              <h2 className="text-4xl font-semibold mb-2 text-primary">
                Tôm hùm Khánh Hoà
              </h2>
              <p className="text-gray-700 lg:w-2/3 w-full opacity-60 pt-2 leading-7">
                Khi nhắc đến địa điểm nuôi trồng thủy hải sản nói chung và tôm
                hùm nói riêng thì sẽ thật là thiếu sót khi mà chúng ta không
                nhắc tới Khánh Hòa. Đây là một tỉnh có sản lượng tôm hùm và lồng
                nuôi tôm dẫn đầu cả nước với khoảng 880 tấn tôm mỗi vụ và 28.500
                lồng nuôi.
              </p>
              <button
                type="submit"
                className="mt-6 hover:bg-[#F0A500E5] transition-colors duration-300 w-24 py-2 text-base bg-orange-500 text-white rounded-xl focus:outline-none focus:ring focus:ring-orange-500"
              >
                Đặt món
              </button>
            </div>
            <div className="flex-1 relative hidden lg:block ">
              <img
                src={product}
                alt=""
                className="z-10 w-[380px] h-[320px] rounded absolute right-0"
              />
              <div className="w-[380px] h-[320px] bg-[#F0A500E5] opacity-20 absolute left-1/4 top-1/4"></div>
            </div>
          </div>
        </div>
        <div className="my-12 px-16">
          <h2 className="text-5xl text-center text-primary w-full font-semibold mb-4">
            Chuyên các món hải sản
          </h2>
          <div className="mt-10 lg:mb-28 mb-0 w-full flex flex-col md:flex-row space-y-6 lg:space-y-0">
            <div className="flex-1 hidden lg:flex p-6 border-2 border-[#F0A500E5] justify-center items-center mr-0 lg:mr-20">
              <img
                src="https://i.pinimg.com/564x/59/ec/57/59ec57e404a50d019f367f2c3124b90e.jpg"
                alt=""
                className="z-10 w-[420px] h-[320px] rounded-full"
              />
            </div>
            <div className="flex-1 text-center lg:text-right">
              <h2 className="text-4xl font-semibold mb-2 text-primary">
                Tôm hùm Khánh Hoà
              </h2>
              <p className="text-gray-700 w-full opacity-60 pt-2 leading-7">
                Khi nhắc đến địa điểm nuôi trồng thủy hải sản nói chung và tôm
                hùm nói riêng thì sẽ thật là thiếu sót khi mà chúng ta không
                nhắc tới Khánh Hòa. Đây là một tỉnh có sản lượng tôm hùm và lồng
                nuôi tôm dẫn đầu cả nước với khoảng 880 tấn tôm mỗi vụ và 28.500
                lồng nuôi.Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được
                dùng vào việc trình bày và dàn trang
              </p>
              <button
                type="submit"
                className="mt-6 hover:bg-[#F0A500E5] transition-colors duration-300 w-24 py-2 text-base bg-orange-500 text-white rounded-xl focus:outline-none focus:ring focus:ring-orange-500"
              >
                Đặt món
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Swiper
          // install Swiper modules
          className="mt-6 lg:mx-16 px-6 w-auto"
          modules={[A11y]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          autoplay={true}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {slideProduct &&
            slideProduct?.data?.map((rating) => (
              <SwiperSlide key={rating.id}>
                <div className="w-auto h-auto border hover:shadow-lg cursor-pointer transition-all">
                  <div className="w-full">
                    <img
                      className="w-full h-full rounded-full"
                      src={rating.imgRating}
                    />
                  </div>
                  <div className="flex justify-between items-center p-2 text-slate-500">
                    <div>
                      <span className="text-sm font-medium overflow-hidden block">
                        {truncateString(rating.star)}
                      </span>
                      <span className="text-xs">
                        {formatCurrency(rating.review)}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      <Reason />
    </div>
  );
};

export default AboutUs;
