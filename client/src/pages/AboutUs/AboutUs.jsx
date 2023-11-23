import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp.js";
import { ScrollToTop, truncateString } from "../../utils/format.js";
import Reason from "../../components/Reason/Reason.jsx";
import { Rate } from "antd";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const date = new Date().getMonth() + 1
const AboutUs = () => {
  const [slideProduct, setSlideRating] = useState(null);
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  useEffect(() => {
    const request = {
      method: "get",
      url: `/review?_time=${date}`,
    };
    sendRequest(request, setSlideRating);
  }, [sendRequest]);

  return (
    <div className="py-24">
      <Helmet>
        <title>Về chúng tôi</title>
        <meta name="about-us" content="About us" />
      </Helmet>

      <ScrollToTop />

      <section className="relative mt-[-36px] h-96 w-full bg-cover bg-center bg-gray-300 bg-[url('https://res.cloudinary.com/dw6jih4yt/image/upload/v1700287265/NhaHangThuyTinh/uwrwxltugznhpakhhyry.webp')]">
        <div className="flex flex-col items-center justify-center absolute inset-0 bg-black bg-opacity-40">
          <div className="text-center text-gray-200 w-2/3 lg:w-1/2">
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-200">
              Về Chúng Tôi
            </h1>
            <p className="mt-4 text-base opacity-80 lg:line-clamp-10 line-clamp-4">
              Nhà hàng hải sản Thủy Tinh là điểm đến tuyệt vời cho những người
              yêu thưởng thức ẩm thực biển ngon tuyệt. Với đội ngũ đầu bếp tài
              năng và không gian thoáng đãng, nhà hàng mang đến trải nghiệm ẩm
              thực tinh tế, hòa quyện giữa hương vị tươi ngon của hải sản và
              không khí trấn an của biển cả.
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-6">
            <button
              onClick={() => navigate("/select-table")}
              type="submit"
              className="hover:bg-[#F0A500E5] transition-colors duration-300 w-1/4 md:w-24 py-2 text-base bg-orange-500 text-white rounded-md focus:outline-none focus:ring focus:ring-orange-500"
            >
              Đặt món
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f2e5e5] flex flex-col justify-center items-center">
        <div className="my-6 px-6 md:my-12 md:px-16">
          <h2 className="md:text-5xl text-3xl text-center text-primary w-full font-semibold lg:mb-4 mb-2">
            Chuyên các món hải sản
          </h2>
          <div className="lg:mt-10 md:mt-5 mt-3 lg:mb-28 mb-0 w-full flex flex-col md:flex-row lg:space-y-0 text-center lg:text-left">
            <div className="flex-1">
              <h2 className="md:text-4xl text-2xl font-semibold mb-2 text-primary">
                Tôm hùm Khánh Hoà
              </h2>
              <p className="text-gray-700 lg:w-2/3 w-full opacity-60 pt-2 leading-7 lg:line-clamp-10 line-clamp-4">
                Khi nhắc đến địa điểm nuôi trồng thủy hải sản nói chung và tôm
                hùm nói riêng thì sẽ thật là thiếu sót khi mà chúng ta không
                nhắc tới Khánh Hòa. Đây là một tỉnh có sản lượng tôm hùm và lồng
                nuôi tôm dẫn đầu cả nước với khoảng 880 tấn tôm mỗi vụ và 28.500
                lồng nuôi.
              </p>
              <button
                onClick={() => navigate("/select-table")}
                type="submit"
                className="mt-6 hover:bg-[#F0A500E5] transition-colors duration-300 w-24 py-2 text-base bg-orange-500 text-white rounded-md focus:outline-none focus:ring focus:ring-orange-500"
              >
                Đặt món
              </button>
            </div>
            <div className="flex-1 relative hidden lg:block ">
              <img
                src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1700287341/NhaHangThuyTinh/hrvf8gusemwv3lyirnah.webp"
                alt=""
                className="z-10 w-[380px] h-[320px] rounded absolute right-0"
              />
              <div className="w-[380px] h-[320px] bg-[#F0A500E5] opacity-20 absolute left-1/4 top-1/4"></div>
            </div>
          </div>
        </div>
        <div className="my-6 px-6 md:my-12 md:px-16">
          <h2 className="md:text-5xl text-3xl text-center text-primary w-full font-semibold lg:mb-4 mb-2">
            Đầu bếp chuyên nghiệp
          </h2>
          <div className="lg:mt-10 md:mt-5 mt-3 lg:mb-28 mb-0 w-full flex flex-col md:flex-row lg:space-y-0">
            <div className="flex-1 hidden lg:flex p-6 border-2 border-[#F0A500E5] justify-center items-center mr-0 lg:mr-20">
              <img
                src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1700287388/NhaHangThuyTinh/nnmewv644b1utmu2l3et.webp"
                alt=""
                className="z-10 w-[420px] h-[320px] rounded-full"
              />
            </div>
            <div className="flex-1 text-center lg:text-right">
              <h2 className="md:text-4xl text-2xl font-semibold mb-2 text-primary">Đội ngũ đầu bếp</h2>
              <p className="text-gray-700 w-full opacity-60 pt-2 leading-7 lg:line-clamp-10 line-clamp-4">
                Từ bề dày kinh nghiệm và sự nhạy cảm trong nghề, các đầu bếp tài
                năng của Thuỷ Tinh đã thổi hồn vào từng món ăn, cuốn hút và
                quyến rũ khách hàng bằng nghệ thuật trình bày sang trọng nhưng
                cũng rất đỗi gần gũi thân quen và hương vị khó cưỡng nhất.
              </p>
              <button
                onClick={() => navigate("/select-table")}
                type="submit"
                className="mt-6 hover:bg-[#F0A500E5] transition-colors duration-300 w-24 py-2 text-base bg-orange-500 text-white rounded-md focus:outline-none focus:ring focus:ring-orange-500"
              >
                Đặt món
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="lg:px-16 px-6 my-12 w-full h-full">
        <h2 className="md:text-4xl text-3xl text-center text-primary w-full font-semibold mb-14">
          Đánh giá của khách hàng
        </h2>
        <Swiper
          // install Swiper modules
          modules={[A11y]}
          spaceBetween={10}
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
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
        >
          {slideProduct &&
            slideProduct?.data?.filter(el=> el.rate >=3)?.map((rating,index) => {
              if(index > 5) return null
              if (rating.rate >= 3) {
                return (
                  <SwiperSlide key={rating.id}>
                    <div className="flex flex-col justify-center items-center md:flex-row p-2 border hover:shadow-lg cursor-pointer transition-all">
                      <div className="w-24 h-20">
                        <img
                          className="w-24 h-20 rounded-full"
                          src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1700287461/NhaHangThuyTinh/yvunsalh6buihbg9ocbp.webp"
                          alt=""
                        />
                      </div>
                      <div className="flex p-2 flex-col text-slate-500">
                        <span>{rating.name}</span>
                        <span className="whitespace-nowrap text-xs py-2">
                          <Rate value={rating.rate} />
                        </span>
                        <div className="h-[50px] max-h-[50px]">
                          {" "}
                          <span className="text-xs line-clamp-1">
                            {truncateString(rating.description, 50)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
              return null;
            })}
        </Swiper>
      </section>
      <Reason />
    </div>
  );
};

export default AboutUs;
