import { memo } from "react";
import Image from "../../../../components/Image/Image.jsx";
import PropTypes from "prop-types";

const PaginationSlider = memo(({ className, index, products }) => {
  return (
    <>
      <div
        className={`${className}`}
        style={{
          animation: "appearance 1s ease-in-out",
          animationDelay: `1s * (${index + 1})`,
        }}
      >
        <div
          className={`w-44 h-44 z-40 absolute -top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full drop-shadow-2xl`}
        >
          <Image
            src={products?.[index]?.image}
            alt={"Ảnh"}
            isLoading={!products?.[index]?.image && false}
            className={"rounded-full"}
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
      </div>
    </>
  );
});
PaginationSlider.displayName = "PaginationSlider";
PaginationSlider.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      // Add more specific PropTypes for product properties if needed
    }),
  ),
};
export default PaginationSlider;