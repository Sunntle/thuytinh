import { formatCurrency } from "../../../utils/format.js";
import { AiFillPlusCircle } from "react-icons/ai";
import PropTypes from 'prop-types';
// import Swiper core and required modules
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {addToOrder} from "../../../redux/Order/orderSlice.js";
import { useDispatch } from "react-redux";



const HomeSlide = ({ listProduct }) => {
    const dispatch = useDispatch();
    const handleAddToOrder = (product) => {
        if (product) {
            dispatch(addToOrder(product));
        }
    };
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
              <div className="relative w-auto h-auto border rounded-lg hover:shadow-lg cursor-pointer transition-all">
                <div className="absolute top-0 right-0 max-w-sm w-5/12 md:w-5/12 h-8 rounded-tr-lg bg-[#C51605] text-white flex justify-center items-center text-xs md:text-sm truncate">
                  Best Seller
                </div>
                <div className="w-full h-[160px] rounded-t-lg">
                  <img
                    className="w-full h-full object-cover rounded-t-lg outline-none"
                    src={product?.ImageProducts[0]?.url}
                    alt=""
                  />
                </div>
                <div className="flex justify-between items-center p-2 text-slate-500">
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium overflow-hidden block w-full whitespace-nowrap truncate">
                      {product.name_product}
                    </span>
                    <span className="text-xs">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <button onClick={() => handleAddToOrder(product)}>
                    <AiFillPlusCircle className="w-6 h-6 text-primary active:text-opacity-80" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
        {/*<SlidePrevButton />*/}
        {/*<SlideNextButton />*/}
    </div>
  );
};
HomeSlide.propTypes = {
  listProduct: PropTypes.object
}
export default HomeSlide;
