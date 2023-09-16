import { useEffect, useState } from "react";

// import Swiper core and required modules
import { A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { Badge } from "antd";
import moment from "moment";
import { AiFillPlusCircle } from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useHttp from "../../hooks/useHttp.js";
import { formatCurrency, truncateString } from "../../utils/format.js";

import AboutUs from "../../components/AboutUs.jsx";
import Banner from "../../components/Banner.jsx";
import Footer from "../../components/Footer.jsx";
import { socket } from "../../services/socket";
import ButtonComponents from "../../../../admin/src/components/button/index.jsx";
const Home = () => {
  const [slideProduct, setSlideProduct] = useState(null);
  const { sendRequest } = useHttp();
  useEffect(() => {
    const request = {
      method: "get",
      url: "/product",
    };
    sendRequest(request, setSlideProduct);
  }, []);
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
  console.log(slideProduct);

  return (
    <div className="pb-24 lg:pb-0 lg:pt-24">
      {/*  Hot Food */}

      <ButtonComponents onClick={onClickCheckSocket} content="2" />
      <Swiper
        // install Swiper modules
        className="mt-12 px-6 w-auto"
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
              <div className="w-auto h-auto border rounded-lg">
                <Badge.Ribbon
                  text="Hippies"
                  className="bg-primary"
                ></Badge.Ribbon>
                <div className="w-full h-[120px]">
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
      {/* code ở đây */}
      <Banner />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
