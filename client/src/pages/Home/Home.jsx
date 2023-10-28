import { useEffect, useRef, useState } from "react";  
import { AiFillPlusCircle } from "react-icons/ai";
import { fetchProduct } from "../../services/api.js";
import { Banner, Reason } from "../../components/index.js";
import useHttp from "../../hooks/useHttp.js";
import { formatCurrency } from "../../utils/format.js";
import { socket } from "../../services/socket";

// import Swiper core and required modules
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import image1 from "../../assets/images/image1.png";
import image4 from "../../assets/images/image4.png";
import image2 from "../../assets/images/image2.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [slideProduct, setSlideProduct] = useState(null);
  const { sendRequest } = useHttp();
  useEffect(() => {
    sendRequest(fetchProduct(), setSlideProduct);
  }, [sendRequest]);
  useEffect(() => {
    socket.emit("new user", { userName: "Taile", role: "R1" });
  }, []);

  return (
    <div>
      <div><Banner /></div>
      <div className="flex items-center justify-center mt-12 px-6 gap-x-6 lg:mx-16">
        <span className="w-[8rem] h-0.5 bg-primary"></span>
        {/* <span className="font-medium text-primary text-2xl whitespace-nowrap px-6">
          Món ăn bán nhiều nhất
        </span> */}
        <h2 className="text-3xl font-bold text-primary pb-2">
        Món ăn bán nhiều nhất
      </h2>
        <span className="w-[8rem] h-0.5 bg-primary"></span>
      </div>
      <Swiper
        // install Swiper modules
        className="mt-6 lg:mx-16 lg:px-0 px-6 w-auto"
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
            spaceBetween: 35,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 35,
          },
        }}
        autoplay={true}
        onSlideChange={() => console.log("slide change")}
      >
        {slideProduct &&
          slideProduct?.data?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative w-auto h-auto border rounded-lg hover:shadow-lg cursor-pointer transition-all overflow-hidden">
                <div className="absolute top-0 right-0 max-w-sm w-5/12 md:w-5/12 h-8 rounded-tr-lg bg-[#C51605] text-white flex justify-center items-center text-xs md:text-sm truncate">
                  Best Seller
                </div>
                <div className="w-full h-[160px] rounded-t-lg">
                  <img
                    className="w-full h-full object-cover rounded-t-lg outline-none"
                    src={product?.imageUrls}
                    alt=""
                  />
                </div>
                <div className="flex justify-between items-center p-2 text-slate-500">
                  <div>
                    <span className="text-sm font-medium overflow-hidden block w-full whitespace-nowrap truncate">
                        {product.name_product}
                      {/*{truncateString(product.name_product, 10)}*/}
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
      <section className="relative my-12 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        <div className="hidden lg:flex z-30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-between text-white">
          <span className="w-24 h-px bg-white"></span>
          <Link className="cursor-pointer font-light text-sm whitespace-nowrap px-4 py-2 border rounded-sm border-white hover:bg-white hover:text-slate-800 transition-colors duration-200">
            Xem thêm
          </Link>
          <span className="w-24 h-px bg-white"></span>
        </div>
        <div className="w-full lg:w-1/3 group overflow-hidden rounded-t-lg lg:rounded-none lg:rounded-l-lg h-44 lg:h-60">
          <img
            src={image1}
            className="h-full w-full group-hover:opacity-90 group-hover:scale-110 duration-200 transition-all object-cover"
          />
        </div>
        <div className="w-full lg:w-1/3 group relative overflow-hidden h-44 lg:h-60">
          <div className="absolute w-full z-10 h-72 bg-black bg-opacity-40"></div>
          <img
            src={image4}
            className="h-full w-full group-hover:opacity-90 group-hover:scale-110 duration-200 transition-all object-cover"
          />
        </div>
        <div className="w-full lg:w-1/3 group overflow-hidden rounded-b lg:rounded-none lg:rounded-r-lg h-44 lg:h-60">
          <img
            src={image2}
            className="h-full w-full group-hover:opacity-90 group-hover:scale-110 duration-200 transition-all object-cover"
          />
        </div>
      </section>

      <Reason />
    </div>
  );
};
export default Home;
