import { useSwiper } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import './index.css'

export function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button className="slide-button left-12" onClick={() => swiper.slidePrev()}>
      <FaChevronLeft className="icon w-4 h-4 xl:w-5 xl:h-5 text-slate-300" />
    </button>
  );
}

export function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button className="slide-button right-12" onClick={() => swiper.slideNext()}>
      <FaChevronRight className="icon w-4 h-4 xl:w-5 xl:h-5 text-slate-300" />
    </button>
  );
}
