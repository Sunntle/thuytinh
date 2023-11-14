import img from "../../../../assets/images/sub-buzz-1009-1646440684-8-removebg-preview.png";
import { motion } from "framer-motion";
import React from "react";
import PropTypes from "prop-types";
import Image from "../../../../components/Image/Image.jsx";

const ProductSlide = React.memo(({ item, currentSlide }) => {
  return (
    <>
      <span className="absolute top-2 left-2 text-base text-[#BEB7B5]">
        Giao hàng tận nơi: 1900 1080
      </span>
      <div className="absolute inset-0 -z-40 overflow-hidden">
        {/* <Image
          isLoading={!item || false}
          src={
            "https://res.cloudinary.com/dw6jih4yt/image/upload/v1699337766/NhaHangThuyTinh/fpp0tssuolblxhbygpjx.webp"
          }
          alt={"anh"}
        /> */}
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
          <img className="w-full h-full object-cover" src={img} alt="" />
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
        <span className="text-3xl lg:text-4xl line-clamp-1 text-[#fc8019]/80 font-bold">
          {item.name}
        </span>
        <p className="text-xl line-clamp-3 text-[#BEB7B5]">
          {item.description}
        </p>
        <motion.button
          initial={{
            boxShadow: "0",
          }}
          whileInView={{
            boxShadow: "3px 3px 0px 1px #fc8019, -3px -3px 0px 1px #fbd38d",
          }}
          transition={{ duration: 0.3, ease: "linear", delay: 1 }}
          type="text"
          className=" text-primary w-full lg:w-fit text-base font-medium bg-white/90 hover:text-primary rounded p-2 border-box hover:bg-white transition-colors duration-300"
        >
          Xem thêm
        </motion.button>
      </motion.div>
    </>
  );
});
ProductSlide.displayName = "ProductSlide";
ProductSlide.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    // Add more specific PropTypes for item properties if needed
  }).isRequired,
  currentSlide: PropTypes.number.isRequired,
};

export default ProductSlide;
