// React
import { memo, useState } from "react";
import * as ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
// Components
import ProductSlide from "./ProductSlide/index.jsx";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import { SlidePrevButton, SlideNextButton } from "../HomeSlide/HomeSlideButton/HomeSlideButton.jsx";
// External Files
import "./index.css";
import PaginationSlider from "./PaginationSlider/index.jsx";
import {
  SlideNextButton,
  SlidePrevButton,
} from "../HomeSlide/HomeSlideButton/HomeSlideButton.jsx";

const ProductSlider = memo(({ products }) => {
  products = products?.data?.slice(0, 4)?.map((item) => ({
    name: item.name_product,
    image:
      typeof item.ImageProducts[0] === "string" ? item.ImageProducts[0] : "",
    description: item.description,
  }));
  const [currentSlide, setCurrentSlide] = useState(0);

  // Pagination
  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return ReactDOMServer.renderToStaticMarkup(
        <PaginationSlider
          className={className}
          index={index}
          products={products}
        />,
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
                <ProductSlide item={item} currentSlide={currentSlide} />
              </SwiperSlide>
            ))}
          <SlidePrevButton className="hidden lg:block" />
          <SlideNextButton className="hidden lg:block" />
        </Swiper>
      </div>
    </>
  );
});
ProductSlider.displayName = "ProductSlider";
ProductSlider.propTypes = {
  products: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name_product: PropTypes.string,
        ImageProducts: PropTypes.array,
        description: PropTypes.string,
        // Add more specific PropTypes for product properties if needed
      }),
    ),
  }),
};
export default ProductSlider;
