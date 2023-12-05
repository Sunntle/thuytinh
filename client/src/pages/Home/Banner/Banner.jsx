import { Typography } from "antd";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Grid } from 'antd';
import { truncateString } from "../../../utils/format";
const { useBreakpoint } = Grid;
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

const description = "Nhà hàng hải sản Thủy Tinh là điểm đến tuyệt vời cho những người yêu thưởng thức ẩm thực biển ngon tuyệt. Với đội ngũ đầu bếp tài năng và không gian thoáng đãng, nhà hàng mang đến trải nghiệm ẩm thực tinh tế, hòa quyện giữa hương vị tươi ngon của hải sản và không khí trấn an của biển cả."
// eslint-disable-next-line react/prop-types
const Banner = () => {
  const screens = useBreakpoint();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <div className="h-screen relative">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dw6jih4yt/image/upload/v1700286846/NhaHangThuyTinh/lwkwc4xdtjn8hnskla5d.webp")`,
            filter: "brightness(50%)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <motion.div
          ref={ref}
          animate={isInView ? "open" : "closed"}
          variants={variantsWrapperBanner}
          transition={{ duration: 0.5 }}
          className={`${screens.lg == true ? "max-w-2xl px-8" : "max-w-lg px-4"} absolute top-0 lg:px-16 md:px-12  w-full h-full flex flex-col items-start justify-center`}
        >
          <motion.div variants={variantsBannerItem}>
            <Typography.Title style={{ color: "#FC8019", margin: 0 }} level={screens.lg ? 1 :  2}>
              Nhà hàng hải sản  {screens.xs ? <><br/>Thủy Tinh</>: "Thủy Tinh"}
            </Typography.Title>
          </motion.div>
          <motion.h4
            variants={variantsBannerItem}
            className="text-gray-300 my-5 py-2"
          >
            {screens.lg == true ? description: truncateString(description, 100) }
          </motion.h4>
          <motion.div variants={variantsBannerItem}>
            <Link
              to="menu"
              size="large"
              type="text"
              className="hover:py-1 hover:px-2 text-primary hover:text-primary rounded border-box hover:bg-white transform transition duration-300 hover:shadow-[3px_3px_0px_1px_#fc8019,-3px_-3px_0px_1px_#fbd38d]"
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
