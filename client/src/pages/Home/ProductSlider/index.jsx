// React
import { useState } from "react";
import * as ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
// Motion
import { motion } from "framer-motion";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { SlidePrevButton } from "../HomeSlide/HomeSlideButton/HomeSlideButton.jsx";
import { SlideNextButton } from "../HomeSlide/HomeSlideButton/HomeSlideButton.jsx";
// External Files
import "./index.css";
import img from "../../../assets/images/sub-buzz-1009-1646440684-8-removebg-preview.png";

const ProductSlider = ({ products }) => {
  products = products?.data?.slice(0, 4)?.map((item) => ({
    name: item.name_product,
    image: typeof item.ImageProducts[0] === 'string' ? item.ImageProducts[0] : '',
    description: item.description,
  }));
  const [currentSlide, setCurrentSlide] = useState(0);

  // Pagination
  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return ReactDOMServer.renderToStaticMarkup(
        <div
          className={`${className}`}
          style={{
            animation: "appearance 1s ease-in-out",
            animationDelay: `1s * (${index + 1})`,
          }}
        >
          <div className="w-44 h-44 absolute -top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full drop-shadow-2xl">
            <img
              className="w-full h-full object-cover rounded-full "
              src={img}
              alt="abc"
            />
          </div>
          <div className="tracking-wide h-full flex flex-col justify-end items-center text-center px-8 space-y-3 overflow-hidden">
            <span className="px-2 text-base font-bold text-[#fc8019] whitespace-nowrap w-11/12 truncate">
              {products?.[index]?.name}
            </span>
            <p className="text-xs line-clamp-3">
              {products?.[index]?.description}
            </p>
          </div>
        </div>,
      );
    },
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <>
      <div className="w-full h-screen">
        <Swiper
          effect="fade"
          pagination={pagination}
          modules={[Pagination, EffectFade]}
          className="mySwiper"
          draggable={true}
          onSlideChange={handleSlideChange}
        >
          {products &&
            products.map((item, index) => (
              <SwiperSlide
                key={index}
                className={`relative p-2 grid lg:grid-cols-2 gap-16 lg:gap-36 pt-36 lg:pt-24 h-full overflow-hidden place-content-start text-center place-items-center lg:place-items-stretch`}
              >
                <span className="absolute top-2 left-2 text-base text-[#BEB7B5]">
                  Giao hàng tận nơi: 1900 1080
                </span>
                <div className="absolute inset-0 -z-10">
                  <img
                    className="w-full h-full object-cover"
                    src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1699337766/NhaHangThuyTinh/fpp0tssuolblxhbygpjx.webp"
                    alt=""
                  />
                </div>
                <div className="w-full h-full lg:h-auto flex justify-center lg:justify-end items-center overflow-hidden">
                  <motion.div
                    key={currentSlide}
                    initial={{
                      x: -250,
                      opacity: 0,
                      rotate: "-180deg",
                    }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                      rotate: "0deg",
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="h-[250px] w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={img}
                      alt=""
                    />
                  </motion.div>
                </div>
                <motion.div
                  key={currentSlide}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="w-8/12 flex flex-col items-center lg:items-start justify-start lg:justify-center text-center lg:text-start space-y-6"
                >
                  <span className=" text-3xl lg:text-4xl line-clamp-2 text-[#fc8019]/80 font-bold">
                    {item.name}
                  </span>
                  <p className=" text-xl line-clamp-3 text-[#BEB7B5]">
                    {item.description}
                  </p>
                  <motion.button
                    initial={{
                      boxShadow: "0",
                    }}
                    whileInView={{
                      boxShadow:
                        "3px 3px 0px 1px #fc8019, -3px -3px 0px 1px #fbd38d",
                    }}
                    transition={{ duration: 0.3, ease: "linear", delay: 1 }}
                    type="text"
                    className=" text-primary w-full lg:w-fit text-base font-medium bg-white/90 hover:text-primary rounded p-2 border-box hover:bg-white transition-colors duration-300"
                  >
                    Xem thêm
                  </motion.button>
                </motion.div>
              </SwiperSlide>
            ))}
          <SlidePrevButton className="hidden lg:block"/>
          <SlideNextButton className="hidden lg:block"/>
        </Swiper>
      </div>
    </>
  );
};
ProductSlider.propTypes = {
  products: PropTypes.shape({
    data: PropTypes.arrayOf(
        PropTypes.shape({
          name_product: PropTypes.string.isRequired,
          ImageProducts: PropTypes.arrayOf(PropTypes.any).isRequired,
          description: PropTypes.string.isRequired,
        })
    ),
  }),
};
export default ProductSlider;
