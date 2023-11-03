// import Swiper core and required modules
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {Product} from "../../../components/index.js";



const HomeSlide = ({ listProduct }) => {
  return (
    <div className="relative w-auto">
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
        {listProduct &&
          listProduct?.data?.map((product) => (
            <SwiperSlide key={product.id}>
              <Product item={product}/>
            </SwiperSlide>
          ))}
      </Swiper>
        {/*<SlidePrevButton />*/}
        {/*<SlideNextButton />*/}
    </div>
  );
};

export default HomeSlide;
