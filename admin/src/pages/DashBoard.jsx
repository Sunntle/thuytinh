import { CiViewTimeline } from "react-icons/ci";
import PieChart from "../components/chart/pie-chart";
import LineChart from "../components/chart/line-chart";
import { Col, Row, Badge } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { getAllProduct, getDataDashboard } from "../services/api";
import { formatGia } from "../utils/format";
import { useCallback } from "react";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
const img =
  "https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000";
const DashBoard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeChart, setTimeChart] = useState("MONTH");
  const [dataProduct, setDataProduct] = useState(null);
  const [discount, setDiscount] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDataDashboard(timeChart);
      const { data: dataPr } = await getAllProduct({
        _sort: "sold",
        _order: "DESC",
        _sold: "gte_0",
        _limit: 10,
      });
      const resProductsDiscount = await getAllProduct({
        _sort: "discount",
        _order: "DESC",
        _discount: "gt_0",
        _limit: 10,
      });
      setDiscount(resProductsDiscount);
      setData(res);
      setDataProduct(dataPr);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [timeChart]);

  useEffect(() => {
    // fetchData();
  }, [fetchData]);

  if (loading) return <Spinner />;
  return (
    <div className="w-full my-7 px-5">
      <Row gutter={[32, 16]}>
        <Col xs={24} lg={16}>
          <div className="rounded-lg border-orange-400 border-2 bg-orange-100 dark:bg-darkModeBgBox flex-row flex items-center h-24">
            <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2">
              <span className="font-medium text-sm text-center ">
                Tổng thu nhập
              </span>
              <p className="text-orange-400 text-lg font-medium text-center">
                54000000
              </p>
            </div>
            <div className="w-1/3  p-4 h-full flex flex-col justify-center items gap-1">
              <span className="font-medium text-sm text-center">Thu nhập</span>
              <p className="text-lg font-medium text-green-500 text-center">
                54000000
              </p>
            </div>
            <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1">
              <span className="font-medium text-sm text-center">Chi phí</span>
              <p className="text-lg font-medium text-red-500 text-center">
                54000000
              </p>
            </div>
          </div>
          <div className="max-w-full mt-4 rounded-lg border-gray-400 border-solid border-2">
            <LineChart
              timeChart={timeChart}
              setTimeChart={setTimeChart}
              data={data}
            />
          </div>
          <div className="mb-6 mt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg mb-2 text-slate-700">
                Sản phẩm bán chạy
              </h4>
              <Link to="/admin/product" style={{ color: "#FC8019" }}>
                Xem tất cả
              </Link>
            </div>
            <Swiper
              speed={1500}
              autoplay={{
                delay: 1800,
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
              {dataProduct?.data?.map((product) => {
                return (
                  <SwiperSlide key={product.id}>
                    <div className="py-3 md:py-4 px-3 md:px-5 rounded-md border border-solid  border-gray-300 hover:border-borderSecondaryColor transition duration-300  text-center">
                      <div className="mb-3">
                        <img
                          className="w-full"
                          src={product.imageUrls?.split(";")[0]}
                          alt=""
                        />
                      </div>
                      <h6 className="font-semibold lg:text-lg">
                        {product.name_product}
                      </h6>
                      <h5 className="text-main font-semibold lg:text-lg my-1">
                        {formatGia(product.price)}
                      </h5>
                      <div className="text-slate-500 text-xs">
                        <span className="after:content-['|'] after:mx-1.5">
                          Bán: {product.sold}
                        </span>
                        <span
                          style={{ color: "#52c41a" }}
                          className="font-bold inline-flex items-center gap-x-1.5 justify-center"
                        >
                          +15%{" "}
                          <UpCircleFilled
                            className="text-lg"
                            style={{ color: "#52c41a" }}
                          />
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg mb-2 text-slate-700">
                Món giảm giá
              </h4>
              <Link to="/admin/product" style={{ color: "#FC8019" }}>
                Xem tất cả
              </Link>
            </div>
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
              {discount?.data.map((el) => {
                return (
                  <SwiperSlide key={el.id}>
                    <div className="md:pe-5 pe-3">
                      <Badge.Ribbon text={`${el.discount}% Off`} color="red">
                        <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                          <div>
                            <img
                              className="w-full"
                              style={{ maxWidth: "130px" }}
                              src={el.imageUrls?.split(";")[0]}
                              alt=""
                            />
                          </div>
                          <div>
                            <h6 className="font-semibold text-lg">
                              {el.name_product}
                            </h6>
                            <div className="mb-2">
                              <h6 className="text-main font-semibold  whitespace-nowrap text-lg">
                                {formatGia(
                                  el.price - (el.price * el.discount) / 100
                                )}
                              </h6>
                              <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">
                                {formatGia(el.price)}
                              </p>
                            </div>
                            <div className="text-slate-500 text-md  ">
                              <span>Hơn 1000+ đánh giá </span>
                            </div>
                          </div>
                        </div>
                      </Badge.Ribbon>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg mb-2 text-slate-700">
                Đặt hàng gần đây
              </h4>
              <Link to="/admin/product" style={{ color: "#FC8019" }}>
                Xem tất cả
              </Link>
            </div>
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
              {discount?.data.map((el) => {
                return (
                  <SwiperSlide key={el.id}>
                    <div className="md:pe-5 pe-3">
                      <Badge.Ribbon text={`${el.discount}% Off`} color="red">
                        <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                          <div>
                            <img
                              className="w-full"
                              style={{ maxWidth: "130px" }}
                              src={el.imageUrls?.split(";")[0]}
                              alt=""
                            />
                          </div>
                          <div>
                            <h6 className="font-semibold text-lg">
                              {el.name_product}
                            </h6>
                            <div className="mb-2">
                              <h6 className="text-main font-semibold  whitespace-nowrap text-lg">
                                {formatGia(
                                  el.price - (el.price * el.discount) / 100
                                )}
                              </h6>
                              <p className="text-gray-400 font-semibold line-through whitespace-nowrap text-xs">
                                {formatGia(el.price)}
                              </p>
                            </div>
                            <div className="text-slate-500 text-md  ">
                              <span>Hơn 1000+ đánh giá </span>
                            </div>
                          </div>
                        </div>
                      </Badge.Ribbon>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Col>
        <Col xs={24} lg={8} className="flex flex-col gap-y-4">
          <div className=" flex flex-col gap-y-4 p-4 rounded-lg border-gray-400 border-solid border-2">
            <div className="flex flex-row ">
              <div className="border-2 rounded-md ms-5 flex justify-end">
                <CiViewTimeline size={50} className="text-main" />
              </div>
              <div className="flex flex-col justify-center items-start ms-5">
                <span className=" font-medium">Số đơn hàng</span>
                <span className="font-medium text-xl">{data?.order}</span>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="border-2 rounded-md ms-5 flex justify-end">
                <CiViewTimeline size={50} className="text-main" />
              </div>
              <div className="flex flex-col justify-center items-start  ms-5">
                <span className=" font-medium">Số món ăn</span>
                <span className="font-medium text-xl">{data?.food}</span>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="border-2 rounded-md ms-5 flex justify-end">
                <CiViewTimeline size={50} className="text-main" />
              </div>
              <div className="flex flex-col justify-center items-start   ms-5">
                <span className=" font-medium">Số bàn đã đặt</span>
                <span className="font-medium text-xl">{data?.table}</span>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="border-2 rounded-md ms-5 flex justify-end">
                <CiViewTimeline size={50} className="text-main" />
              </div>
              <div className="flex flex-col justify-center items-start  ms-5">
                <span className=" font-medium">Số người dùng</span>
                <span className="font-medium text-xl">{data?.user}</span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 border-gray-400 border-solid">
            <span className="font-medium text-lg">Món ăn phổ biến</span>
            <div className="overflow-hidden w-full p-2">
              <PieChart data={data?.category || []} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
