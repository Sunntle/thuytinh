import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Image from "../../components/Image/Image.jsx";

const arrContent = [
  {
    icon: <BsBookmarkCheckFill className="text-white text-xl" />,
    image:
      "https://res.cloudinary.com/dw6jih4yt/image/upload/w_400,h_300/v1700287265/NhaHangThuyTinh/uwrwxltugznhpakhhyry.webp",
    title: "Đặt bàn online",
    content:
      "Nếu bạn muốn có sự chuẩn bị tốt nhất cho một cuộc hẹn, bạn không thể thiếu sự chuẩn bị trước cho việc đặt bàn tại nhà hàng của chúng tôi.",
  },
  {
    icon: <FaShippingFast className="text-white text-xl" />,
    image:
      "https://res.cloudinary.com/dw6jih4yt/image/upload/v1700288208/NhaHangThuyTinh/ypva1ljhu7vl29xgfwh7.webp",
    title: "Giao hàng tận nơi",
    content:
      "Bạn không cần phải tốn công đến nhà hàng để đặt món, nhà hàng Thuỷ Tinh sẽ cung cấp dịch vụ giao hàng tận nơi đến cho quý khách hàng.",
  },
  {
    icon: <RiServiceFill className="text-white text-xl" />,
    image:
      "https://res.cloudinary.com/dw6jih4yt/image/upload/v1700287388/NhaHangThuyTinh/nnmewv644b1utmu2l3et.webp",
    title: "Chăm sóc khách hàng",
    content:
      "Nhà hàng Thuỷ Tinh luôn đặt khách hàng trong tim. Chúng tôi khẳng định sẽ tận tâm, lắng nghe và phục vụ khách hàng bằng những gì mình có.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-[700px] my-12 px-6 lg:px-16 lg:pt-12 bg-white flex justify-center items-center">
        <div>
          <h2 className="text-4xl font-bold text-primary pb-4">
            Tại sao bạn chọn chúng tôi
          </h2>
          <p className="text-gray-500 text-sm lg:w-1/2 w-full">
            Nhà hàng Thuỷ Tinh là lựa chọn tuyệt vời khi có đầy đủ các dịch vụ
            dành cho khách hàng thân yêu của chúng tôi.
          </p>
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, when: "afterChildren" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8"
          >
            {arrContent &&
                arrContent.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-white transform transition duration-300 hover:shadow-lg rounded-xl border"
                    >
                      <div className="overflow-hidden rounded-t-xl h-[220px]">
                        <Image
                            className="transform transition duration-300 hover:scale-105"
                            src={item.image}
                            alt="anh"
                        />
                      </div>
                      <div className="p-6 flex flex-col space-y-4">
                        <div className="flex space-x-3 items-center justify-left">
                          <div className="p-2 bg-primary rounded-full flex">
                            {item.icon}
                          </div>
                          <h2 className="text-xl font-semibold text-gray-800 overflow-hidden whitespace-nowrap">
                            {item.title}
                          </h2>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-3">
                          {item.content}
                        </p>
                        <button className="w-full bg-primary text-white rounded-full px-4 py-2 hover:bg-primary/80 transition duration-300 ease-in-out hover:scale-105">
                          Xem Menu
                        </button>
                      </div>
                    </motion.div>
                ))}
          </motion.div>
        </div>
    </div>
  );
};

export default AboutUs;
