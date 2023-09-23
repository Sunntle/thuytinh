import { Dropdown, Input } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";

import "./searchStyle.scss";
import { Link } from "react-router-dom";
const { Search } = Input;
// eslint-disable-next-line react/prop-types
const categories = [
  {
    name_category: "Abc",
    thumbnail:
      "https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.77e1f6929495d6e6ebc7.jpg",
  },
  {
    name_category: "Abc",
    thumbnail:
      "https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.77e1f6929495d6e6ebc7.jpg",
  },
  {
    name_category: "Abc",
    thumbnail:
      "https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.77e1f6929495d6e6ebc7.jpg",
  },
  {
    name_category: "Abc",
    thumbnail:
      "https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.77e1f6929495d6e6ebc7.jpg",
  },
];
function SearchComponent({ className, size, textColor }) {
  const onSearch = (value) => console.log(value);
  const customContent = () => {
    return (
      <div className="bg-white rounded-lg px-5 py-3 shadow-md">
        <h4 className="text-gray-500 mb-3">Tìm kiếm gần đây</h4>
        <div className="my-5">
          <Link className="border rounded-full border-gray-300 border-solid py-2 px-3 transition-all duration-500 text-gray-500 hover:text-main hover:border-secondaryColor me-2">
            Đồ nướng
          </Link>
          <Link className="border rounded-full border-gray-300 border-solid py-2 px-3 transition-all duration-500 text-gray-500 hover:text-main hover:border-secondaryColor me-2">
            Đồ xào
          </Link>
        </div>
        <h4 className="text-gray-500 my-3">Món ăn phổ biến</h4>
        <div>
          <Swiper
            speed={1000}
            slidesPerView={4}
            spaceBetween={20}
            className="mySwiper"
          >
            {categories?.map((category, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 text-center">
                    <img
                      className="w-full mb-3"
                      src={category.thumbnail}
                      alt=""
                    />
                    <h6 className="font-semibold">{category.name_category}</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  };
  return (
    <Dropdown
      trigger={["click"]}
      overlayClassName="max-w-[200px]"
      dropdownRender={customContent}
    >
      <Search
        placeholder="Tìm kiếm..."
        allowClear
        onSearch={onSearch}
        className={`${className} rounded-lg search h-full ${
          textColor && "change-text-color"
        }`}
        size={size}
      />
    </Dropdown>
  );
}
export default SearchComponent;
