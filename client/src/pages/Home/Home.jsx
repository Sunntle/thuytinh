// React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import HomeSlide from "./HomeSlide/index.jsx";
import Banner from "./Banner/Banner.jsx";
import Reason from "../../components/Reason/Reason.jsx";
// Service
import { fetchProductByLimit } from "../../services/api.js";
// Hooks
import useHttp from "../../hooks/useHttp.js";
// Framer Motion
import { motion } from "framer-motion";
// External File
import image1 from "../../assets/images/image1.png";
import image4 from "../../assets/images/image4.png";
import image2 from "../../assets/images/image2.png";
import ProductSlider from "./ProductSlider/index.jsx";

const Home = () => {
  const [slideProduct, setSlideProduct] = useState(null);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchAllProduct = async () => {
      await sendRequest(fetchProductByLimit(7), setSlideProduct, false);
    };
    fetchAllProduct();
  }, [sendRequest]);

  return (
    <div className="tracking-wide pb-12 lg:pb-0">
      <Banner />
      <div className="flex items-center justify-center mt-12 px-6 gap-x-6 lg:mx-16">
        <span className="hidden md:block w-[8rem] h-0.5 bg-primary"></span>
        <h2 className="text-3xl font-bold text-primary pb-2">
          Món ăn bán nhiều nhất
        </h2>
        <span className="hidden md:block w-[8rem] h-0.5 bg-primary"></span>
      </div>

      <HomeSlide listProduct={slideProduct} />

      <motion.section
        initial={{ opacity: 0, translateY: "30px" }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.75 }}
        className="relative my-12 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between"
      >
        <div className="hidden lg:flex z-30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-between text-white">
          <span className="w-24 h-px bg-white"></span>
          <Link
            to="/menu"
            className="cursor-pointer font-light text-sm whitespace-nowrap px-4 py-2 border rounded-sm border-white hover:bg-white hover:text-slate-800 transition-colors duration-200"
          >
            Xem thêm
          </Link>
          <span className="w-24 h-px bg-white"></span>
        </div>
        <div className="w-full lg:w-1/3 group overflow-hidden rounded-t-lg lg:rounded-none lg:rounded-l-lg h-44 lg:h-60">
          <img
            src={image1}
            className="h-full w-full group-hover:opacity-90 group-hover:scale-110 duration-200 transition-all object-cover"
            alt="anh"
          />
        </div>
        <div className="w-full lg:w-1/3 group relative overflow-hidden h-44 lg:h-60">
          <div className="absolute w-full z-10 h-72 bg-black bg-opacity-40"></div>
          <img
            src={image4}
            className="h-full w-full group-hover:opacity-90 group-hover:scale-110 duration-200 transition-all object-cover"
            alt="anh"
          />
        </div>
        <div className="w-full lg:w-1/3 group overflow-hidden rounded-b lg:rounded-none lg:rounded-r-lg h-44 lg:h-60">
          <img
            src={image2}
            className="h-full w-full group-hover:opacity-90 group-hover:scale-110 duration-200 transition-all object-cover"
            alt="anh"
          />
        </div>
      </motion.section>

      {slideProduct && <ProductSlider products={slideProduct} />}

      <Reason />
    </div>
  );
};
export default Home;
