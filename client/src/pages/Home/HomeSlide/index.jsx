import PropTypes from "prop-types";
// import Swiper core and required modules
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "../../../components/index.js";
import { addToOrder } from "../../../redux/Order/orderSlice.js";
import { useDispatch } from "react-redux";
import { message } from "antd";

const HomeSlide = ({ listProduct }) => {
  const dispatch = useDispatch();

  const handleAddToOrder = async (product) => {
    if (!product) {
      message.open({
        type: "danger",
        content: "Không tồn tại món ăn này",
      });
      return;
    }

    if (!(product.amount > 0)) {
      message.open({
        type: "info",
        content: "Sản phẩm đã hết hàng",
      });
      return;
    }
    dispatch(addToOrder(product));
  };

  return (
    <div className="relative w-auto">
      <Swiper
        // install Swiper modules
        className="my-6 lg:mx-16 lg:px-0 px-6 w-auto bg-white"
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
      >
        {listProduct &&
          listProduct?.map((product) => (
            <SwiperSlide key={product.id}>
              <Product className="my-4 hover:scale-100 border-0 hover:shadow-lg hover:border-none" item={product} handleAddToOrder={handleAddToOrder} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
HomeSlide.propTypes = {
  listProduct: PropTypes.array || Blob,
};
export default HomeSlide;
