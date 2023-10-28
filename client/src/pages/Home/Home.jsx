import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { fetchProduct } from "../../services/api.js";
import { Banner, Reason } from "../../components/index.js";
import useHttp from "../../hooks/useHttp.js";
import { formatCurrency } from "../../utils/format.js";
import { socket } from "../../services/socket";
import image1 from "../../assets/images/image1.png";
import image4 from "../../assets/images/image4.png";
import image2 from "../../assets/images/image2.png";
import HomeSlide from "./HomeSlide/HomeSlide.jsx";

const Home = () => {
  const [slideProduct, setSlideProduct] = useState(null);
  const { sendRequest } = useHttp();

  useEffect(() => {
    sendRequest(fetchProduct(), setSlideProduct);
  }, [sendRequest]);

  useEffect(() => {
    socket.emit("new user", { userName: "Taile", role: "R1" });
  }, []);

  return (
    <div>
      <Banner />
      <div className="flex items-center justify-between mt-12 px-6 lg:px-0 lg:mx-16">
        <span className="w-full h-0.5 bg-black"></span>
        <span className="font-medium text-2xl whitespace-nowrap px-6">
          Bán Chạy Nhất
        </span>
        <span className="w-full h-0.5 bg-black"></span>
      </div>

      <HomeSlide listProduct={slideProduct} />

      <section className="relative my-12 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        <div className="hidden lg:flex z-30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-between text-white">
          <span className="w-24 h-px bg-white"></span>
          <span className="cursor-pointer font-light text-sm whitespace-nowrap px-4 py-2 border rounded-sm border-white hover:bg-white hover:text-slate-800 transition-colors duration-200">
            Xem thêm
          </span>
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
      </section>

      <Reason />
    </div>
  );
};
export default Home;
