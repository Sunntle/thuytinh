// React
import { useState } from "react";
import * as ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
// Components
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  SlidePrevButton,
  SlideNextButton,
} from "../HomeSlide/HomeSlideButton/HomeSlideButton.jsx";
// External Files
import "./index.css";
import PaginationSlider from "./PaginationSlider/index.jsx";
import ProductSlide from "./ProductSlide/index.jsx";

const ProductSlider = ({ products }) => {
  products = products?.data?.slice(0, 4)?.map((item) => ({
    name: item.name_product,
    image:
      typeof item?.imageproducts?.[1]?.url === "string" ? item?.imageproducts?.[1]?.url : "",
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
    <Swiper
      effect="fade"
      pagination={pagination}
      modules={[Pagination, EffectFade]}
      className="mySwiper lg:h-[700px] my-10"
      draggable={true}
      onSlideChange={handleSlideChange}
    >
      {products &&
        products.map((item, index) => (
          <SwiperSlide
            key={index}
            className={`relative p-2 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-36 py-12 lg:pt-12 h-full overflow-hidden place-content-start text-center place-items-center lg:place-items-stretch bg-[url('https://res.cloudinary.com/dw6jih4yt/image/upload/v1699337766/NhaHangThuyTinh/fpp0tssuolblxhbygpjx.webp')] bg-center bg-cover bg-no-repeat`}
          >
            <ProductSlide item={item} currentSlide={currentSlide} />
          </SwiperSlide>
        ))}
      <SlidePrevButton className="hidden lg:block" />
      <SlideNextButton className="hidden lg:block" />
    </Swiper>
  );
};
ProductSlider.displayName = "ProductSlider";
ProductSlider.propTypes = {
  products: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name_product: PropTypes.string,
        ImageProducts: PropTypes.array,
        description: PropTypes.string,
      }),
    ),
  }),
};
export default ProductSlider;