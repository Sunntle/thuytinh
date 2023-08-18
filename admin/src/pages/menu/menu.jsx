import { Badge, Col, Row } from "antd";
import SearchComponent from "../../components/search";
import ButtonComponents from "../../components/button";
import { UpCircleFilled } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
function MenuPage() {
  return (
    <div className="my-7 px-5">
      <Row justify="space-between" align="center" className="mb-4">
        <Col xs={6}>
          <SearchComponent background={"bg-transparent"} size="medium"></SearchComponent>
        </Col>
        <Col xs={6} style={{ textAlign: "-webkit-right" }}>
          <ButtonComponents
            borderColor={"border-borderSecondaryColor"}
            backgroundColor={"bg-secondaryColor"}
            content={"Thêm mới"}
          />
        </Col>
      </Row>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Danh mục</h4>
        <div>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 6,
                spaceBetween: 8,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
          >
            <SwiperSlide>
              <div className="px-10 py-6 rounded-md border text-center">
                <img
                  className="w-full mb-3"
                  src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                  alt=""
                />
                <h6 className="font-semibold">Gà rán</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-10 py-6 rounded-md border text-center">
                <img
                  className="w-full mb-3"
                  src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                  alt=""
                />
                <h6 className="font-semibold">Gà rán</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-10 py-6 rounded-md border text-center">
                <img
                  className="w-full mb-3"
                  src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                  alt=""
                />
                <h6 className="font-semibold">Gà rán</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-10 py-6 rounded-md border text-center">
                <img
                  className="w-full mb-3"
                  src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                  alt=""
                />
                <h6 className="font-semibold">Gà rán</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-10 py-6 rounded-md border text-center">
                <img
                  className="w-full mb-3"
                  src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                  alt=""
                />
                <h6 className="font-semibold">Gà rán</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-10 py-6 rounded-md border text-center">
                <img
                  className="w-full mb-3"
                  src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                  alt=""
                />
                <h6 className="font-semibold">Gà rán</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-10 py-6 rounded-md border text-center">
                <img
                  className="w-full mb-3"
                  src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                  alt=""
                />
                <h6 className="font-semibold">Gà rán</h6>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Sản phẩm bán chạy</h4>
        <div>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            className="mySwiper"
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide>
              <div className="px-6 py-4 rounded-md border text-center">
                <div className="mb-3 p-3">
                  <img
                    className="w-full"
                    src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                    alt=""
                  />
                </div>
                <h6 className="font-semibold text-lg">Gà rán</h6>
                <h5 className="text-main font-semibold text-lg my-1">20000 VNĐ</h5>
                <div className="text-slate-500 text-xs">
                  <span className="after:content-['|'] after:mx-1.5">Bán: 1k</span>
                  <span style={{ color: "#52c41a" }} className="inline-flex items-center gap-x-1.5 justify-center">
                    +15% <UpCircleFilled style={{ color: "#52c41a" }} />
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-6 py-4 rounded-md border text-center">
                <div className="mb-3 p-3">
                  <img
                    className="w-full"
                    src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                    alt=""
                  />
                </div>
                <h6 className="font-semibold text-lg">Gà rán</h6>
                <h5 className="text-main font-semibold text-lg my-1">20000 VNĐ</h5>
                <div className="text-slate-500 text-xs">
                  <span className="after:content-['|'] after:mx-1.5">Bán: 1k</span>
                  <span style={{ color: "#52c41a" }} className="inline-flex items-center gap-x-1.5 justify-center">
                    +15% <UpCircleFilled style={{ color: "#52c41a" }} />
                  </span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Món giảm giá</h4>
        <div>
          <Swiper
            slidesPerView={1}
            className="mySwiper"
            breakpoints={{
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            <SwiperSlide>
              <div className="md:pe-5 pe-3">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="px-2 py-5 rounded-md border text-left flex items-center justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "90px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold">Gà rán</h6>
                      <h6 className="text-main font-semibold  whitespace-nowrap">20000 VNĐ</h6>
                      <h6 className="text-gray-400 font-semibold line-through whitespace-nowrap">70000 VNĐ</h6>
                      <div className="text-slate-500 text-xs">
                        <span>Bán: 1k</span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="pe-5">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="px-2 py-5 rounded-md border text-left flex items-center justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "90px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold">Gà rán</h6>
                      <h6 className="text-main font-semibold  whitespace-nowrap">20000 VNĐ</h6>
                      <h6 className="text-gray-400 font-semibold line-through whitespace-nowrap">70000 VNĐ</h6>
                      <div className="text-slate-500 text-xs">
                        <span>Bán: 1k</span>
                      </div>
                    </div>
                  </div>
                </Badge.Ribbon>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="pe-5">
                <Badge.Ribbon text="15% Off" color="red">
                  <div className="px-2 py-5 rounded-md border text-left flex items-center justify-evenly">
                    <div>
                      <img
                        className="w-full"
                        style={{ maxWidth: "90px" }}
                        src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-digital-illustration-and-vector-clip-art-of-fried-chicken-drumstick-free-png-image_8089938.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="font-semibold">Gà rán</h6>
                      <h6 className="text-main font-semibold  whitespace-nowrap">20000 VNĐ</h6>
                      <h6 className="text-gray-400 font-semibold line-through whitespace-nowrap">70000 VNĐ</h6>
                      <div className="text-slate-500 text-xs">
                        <span>Bán: 1k</span>
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
