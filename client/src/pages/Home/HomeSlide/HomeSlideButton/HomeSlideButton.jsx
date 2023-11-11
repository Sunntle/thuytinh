import { useSwiper } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import './index.css'
import PropTypes from "prop-types";

export function SlidePrevButton({className}) {
  const swiper = useSwiper();

  return (
    <button className={`slide-button left-5 ${className}`} onClick={() => swiper.slidePrev()}>
      <FaChevronLeft size={40} className="icon text-slate-300" />
    </button>
  );
}

export function SlideNextButton({className}) {
  const swiper = useSwiper();

  return (
    <button className={`slide-button right-5 ${className}`} onClick={() => swiper.slideNext()}>
      <FaChevronRight size={40} className="icon text-slate-300" />
    </button>
  );
}
SlideNextButton.propTypes = {
    className: PropTypes.string,
};
SlidePrevButton.propTypes = {
    className: PropTypes.string,
};