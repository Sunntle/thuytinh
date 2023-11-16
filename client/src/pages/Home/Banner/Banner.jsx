import { Typography } from "antd";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bannerBg from '../../../assets/images/Banner1.png'

const variantsWrapperBanner = {
  open: {
    opacity: 1,
    translateX: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
  closed: {
    opacity: 0,
    translateX: "-400px",
  },
};

const variantsBannerItem = {
  open: {
    translateX: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    translateX: "-400px",
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};

// const imageUrls =
//   "https://images.pexels.com/photos/13262499/pexels-photo-13262499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// eslint-disable-next-line react/prop-types
const Banner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <div className="h-screen relative">
        <div
          className="h-full w-full "
          style={{
            backgroundImage: `url(${bannerBg})`,
            filter: "brightness(50%)",
            backgroundPosition: "center",
          }}
        ></div>
        <motion.div
          ref={ref}
          animate={isInView ? "open" : "closed"}
          variants={variantsWrapperBanner}
          transition={{ duration: 0.5 }}
          className="absolute top-0 lg:px-16 md:px-12 px-8 w-full max-w-2xl h-full flex flex-col items-start justify-center"
        >
          <motion.div variants={variantsBannerItem}>
            <Typography.Title style={{ color: "#FC8019", margin: 0 }} level={1}>
              Nhà hàng hải sản Thủy Tinh
            </Typography.Title>
          </motion.div>
          <motion.h4
            variants={variantsBannerItem}
            className="text-white my-5 py-2 "
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            illum cupiditate quaerat ratione vero natus eligendi culpa hic,
            ipsum aliquam placeat minima consectetur neque eveniet, quam nam eum
            excepturi nobis?{" "}
          </motion.h4>
          <motion.div variants={variantsBannerItem}>
            <Link
              to="menu"
              size="large"
              type="text"
              className=" text-primary hover:text-primary rounded border-box hover:bg-white transform transition duration-300 hover:shadow-[3px_3px_0px_1px_#fc8019,-3px_-3px_0px_1px_#fbd38d]"
            >
              Xem thêm
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
