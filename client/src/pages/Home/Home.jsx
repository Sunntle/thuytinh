import { useEffect, useState } from "react";

// import Swiper core and required modules
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { Badge, Button } from "antd";
import moment from "moment";
import { AiFillPlusCircle } from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useParams } from "react-router-dom";
import AboutUs from "../../components/AboutUs.jsx";
import Banner from "../../components/Banner.jsx";
import useHttp from "../../hooks/useHttp.js";
import { socket } from "../../services/socket";
import { formatCurrency, truncateString } from "../../utils/format.js";

const Home = () => {
  const [slideProduct, setSlideProduct] = useState(null);
  const { sendRequest } = useHttp();
  const { slug } = useParams();
  console.log(slug);

  useEffect(() => {
    const request = {
      method: "get",
      url: "/product",
    };
    sendRequest(request, setSlideProduct);
  }, [sendRequest]);

  useEffect(() => {
    socket.emit("new user", { userName: "Taile", role: "R1" });
  }, []);
  const onClickCheckSocket = () => {
    socket.emit("new order", {
      id: 12706,
      name: "order",
      status: false,
      timestamp: moment().format(),
    });
  };

  return (
    <div className="pb-24 lg:pb-0 lg:pt-24">
      <Button onClick={onClickCheckSocket} content="2" />

      <Banner />
      <div className="flex items-center justify-between mt-12 px-6 lg:mx-16">
        <span className="w-full h-0.5 bg-black"></span>
        <span className="font-medium text-2xl whitespace-nowrap px-6">
          Bán Chạy Nhất
        </span>
        <span className="w-full h-0.5 bg-black"></span>
      </div>
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
          slideProduct?.data?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="w-auto h-auto border rounded-lg hover:shadow-lg cursor-pointer transition-all">
                <Badge.Ribbon
                  text="Hippies"
                  className="bg-primary"
                ></Badge.Ribbon>
                <div className="w-full h-[160px]">
                  <img
                    className="w-full h-full rounded-t-lg"
                    src={product.imageUrls}
                    alt=""
                  />
                </div>
                <div className="flex justify-between items-center p-2 text-slate-500">
                  <div>
                    <span className="text-sm font-medium overflow-hidden block">
                      {truncateString(product.name_product)}
                    </span>
                    <span className="text-xs">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <button>
                    <AiFillPlusCircle className="w-6 h-6 text-primary" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <AboutUs />
    </div>
  );
};

export default Home;
