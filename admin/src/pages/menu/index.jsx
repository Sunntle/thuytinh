import { Badge, Row } from "antd";
import SearchComponent from "../../components/search";
import { UpCircleFilled } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCate } from "../../services/api";
import { Autoplay } from "swiper/modules";
function MenuPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resCate = await getAllCate();
      setCategories(resCate);
    };
    fetchData();
  }, []);
  return (
    <div className="my-7 px-5">
      <Row justify="space-between" align="center" className="mb-4">
        <SearchComponent className="bg-transparent max-w-sm" size="medium"></SearchComponent>
      </Row>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg mb-2 text-slate-700">Danh mục</h4>
          <Link to="/" style={{ color: "#FC8019" }}>
            Xem tất cả
          </Link>
        </div>
        <div>
          <Swiper
            speed={1500}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
          >
            {categories?.map((category, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="px-5 py-3 xl:px-10 xl:py-6  border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 text-center">
                    <img className="w-full mb-3" src={category.thumbnail} alt="" />
                    <h6 className="font-semibold">{category.name_category}</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg mb-2 text-slate-700">Sản phẩm bán chạy</h4>
          <Link to="/" style={{ color: "#FC8019" }}>
            Xem tất cả
          </Link>
        </div>
        <div>
          <Swiper
            speed={1500}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            className="mySwiper"
            breakpoints={{
              525: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 15,
              },
            }}
          >
            <SwiperSlide>
              <div className="py-3 md:py-4 px-3 md:px-5 rounded-md border border-solid  border-gray-300 hover:border-borderSecondaryColor transition duration-300  text-center">
                <div className="mb-3">
                  <img
                    className="w-full"
                    src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                    alt=""
                  />
                </div>
                <h6 className="font-semibold lg:text-lg">Gà rán</h6>
                <h5 className="text-main font-semibold lg:text-lg my-1">20000 VNĐ</h5>
                <div className="text-slate-500 text-xs">
                  <span className="after:content-['|'] after:mx-1.5">Bán: 1k</span>
                  <span style={{ color: "#52c41a" }} className="font-bold inline-flex items-center gap-x-1.5 justify-center">
                    +15% <UpCircleFilled className="text-lg" style={{ color: "#52c41a" }} />
                  </span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg mb-2 text-slate-700">Món giảm giá</h4>
          <Link to="/" style={{ color: "#FC8019" }}>
            Xem tất cả
          </Link>
        </div>
        <div>
          <Swiper
            speed={1500}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            className="mySwiper"
            breakpoints={{
              686: {
                slidesPerView: 2,
              },
              1249: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "130px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold text-lg">Gà rán</h6>
                      <div className="mb-2">
                        <h6 className="text-main font-semibold  whitespace-nowrap text-lg">20000 VNĐ</h6>
                        <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">70000 VNĐ</p>
                      </div>
                      <div className="text-slate-500 text-md  ">
                        <span>Hơn 1000+ đánh giá </span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
