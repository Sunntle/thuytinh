import { CiViewTimeline } from "react-icons/ci";
import PieChart from "../components/chart/pie-chart";
import AreaChart from "../components/chart/area-chart";
import { Col, Row, Badge, Typography, Segmented } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useCallback } from "react";
import { formatGia, truncateString, formatnumber } from "../utils/format";
import { Autoplay } from "swiper/modules";
import { getAllProduct, getDataDashboard } from "../services/api";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
import LineChart from "../components/chart/line-chart";
import { weekArrText } from "../utils/constant";

const { Title } = Typography;
import CountUp from 'react-countup';
import moment from "moment";
import 'moment/dist/locale/vi';
const DashBoard = () => {
  moment.locale('vi');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const currentWeek = moment().week();
  const [timeChart, setTimeChart] = useState("MONTH");
  const [week, setWeek] = useState(currentWeek);
  const [discount, setDiscount] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [res1, resProductsDiscount] = await Promise.all([getDataDashboard({ weekcurrent: week, type: timeChart }), getAllProduct({
        _sort: "discount",
        _order: "DESC",
        _discount: "gte_0",
        _limit: 10,
      })
      ]);
      setDiscount(resProductsDiscount);
      setData(res1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [timeChart, week])

  useEffect(() => {
    fetchData()
  }, [timeChart, fetchData])
  console.log(loading);
  if (loading) return <Spinner />

  const dataOpWeek = weekArrText.map((v, i) => ({ label: v, value: currentWeek - i })).reverse();

  const handChangeWeek = (val) => {
    setWeek(val)
  }
  return (
    <div className="w-full my-7 px-5">
      <Row gutter={[32, 16]}>
        <Col xs={24} lg={16}>
          <div className="rounded-lg border-orange-400 border-2 bg-orange-100 dark:bg-darkModeBgBox flex-row flex items-center h-24">
            <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2">
              <span className="font-medium text-sm text-center ">
                Tổng thu nhập - Năm {new Date().getFullYear()}
              </span>
              <p className="text-orange-400 text-lg font-medium text-center">
                {data?.totalOrderYear ? (
                  <CountUp end={data?.totalOrderYear} separator="," />
                ) : (
                  0
                )}
              </p>
            </div>
            <div className="w-1/3  p-4 h-full flex flex-col justify-center items gap-1">
              <span className="font-medium text-sm text-center">
                Thu nhập - Tháng {new Date().getMonth() + 1}
              </span>
              <p className="text-lg font-medium text-green-500 text-center">
                {data.montdPreAndCur?.[0]?.total ? (
                  <CountUp
                    end={data.montdPreAndCur?.[0]?.total}
                    separator=","
                  />
                ) : (
                  0
                )}
              </p>
            </div>
            <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1">
              <span className="font-medium text-sm text-center">Chi phí</span>
              <p className="text-lg font-medium text-red-500 text-center">
                {data?.costMaterial?.total_cost ? (
                  <CountUp end={data?.costMaterial?.total_cost} separator="," />
                ) : (
                  0
                )}
              </p>
            </div>
          </div>
          <div className="max-w-full mt-4 rounded-lg border-gray-400 border-solid border-2 mb-6">
            <AreaChart
              timeChart={timeChart}
              setTimeChart={setTimeChart}
              data={data}
            />
          </div>
          <div className="max-w-full mt-4 rounded-lg border-gray-400 border-solid border-2 mb-6">
            <LineChart
              series={[
                {
                  name: "Tổng đơn hàng trong ngày",
                  type: "column",
                  data: data?.chartWeek?.map((i) => i.totalOrder) || [],
                },
                {
                  name: "Tổng tiền trong ngày",
                  type: "area",
                  data: data?.chartWeek?.map((i) => i.total) || [],
                },
              ]}
              labels={data?.chartWeek?.map((i) => i.createdAt) || []}
              yaxis={[
                {
                  min: 0,
                  max: () => {
                    return;
                  },

                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: "#008FFB",
                  },
                  labels: {
                    style: {
                      colors: "#008FFB",
                    },
                    formatter: (val) => {
                      return Math.ceil(val) + " đơn";
                    },
                  },
                  title: {
                    style: {
                      color: "#008FFB",
                    },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                {
                  seriesName: "Income",
                  opposite: true,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: "#00E396",
                  },
                  labels: {
                    style: {
                      colors: "#00E396",
                    },

                    formatter: (val) => {
                      return formatnumber(val);
                    },
                  },

                  title: {
                    text: "Vnđ",
                    style: {
                      color: "#00E396",
                    },
                  },
                },
              ]}
              dataLabels={{
                enabled: true,
                enabledOnSeries: [0, 1],
                formatter: function (
                  value,
                  { seriesIndex, dataPointIndex, w }
                ) {
                  return formatnumber(value);
                },
              }}
            >
              <div>
                <Title level={4} className="text-center mt-4">
                  Thông kê theo tuần
                </Title>
                <div className="flex justify-center">
                  <Segmented
                    options={dataOpWeek}
                    defaultValue={week}
                    onChange={handChangeWeek}
                  />
                </div>
              </div>
            </LineChart>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg mb-2">Món giảm giá</h4>
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
                  spaceBetween: 10,
                },
                // 1249: {
                //   slidesPerView: 3,
                // },
              }}
              modules={[Autoplay]}
            >
              {discount?.data.map((el) => {
                return (
                  <SwiperSlide key={el.id}>
                    <div className="pe-2">
                      <Badge.Ribbon text={`${el.discount}% Off`} color="red">
                        <div className="py-5 px-3 sm:px-5 md:px-3 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 flex items-center justify-around sm:justify-around lg:justify-evenly">
                          <div>
                            <img
                              className="w-full"
                              style={{ maxWidth: "130px" }}
                              src={el?.ImageProducts[0]?.url}
                              alt=""
                            />
                          </div>
                          <div>
                            <h6 className="font-semibold text-lg">
                              {truncateString(el.name_product, 11)}
                            </h6>
                            <div className="mb-2">
                              <h6 className="text-main font-semibold  whitespace-nowrap text-lg">
                                {el.discount > 0
                                  ? formatGia(
                                      el.price - (el.price * el.discount) / 100
                                    )
                                  : formatGia(el.price)}
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
                <span className="font-medium text-xl">
                  {data?.countOrder ? (
                    <CountUp end={data?.countOrder} separator="," />
                  ) : (
                    0
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="border-2 rounded-md ms-5 flex justify-end">
                <CiViewTimeline size={50} className="text-main" />
              </div>
              <div className="flex flex-col justify-center items-start  ms-5">
                <span className=" font-medium">Số món ăn</span>
                <span className="font-medium text-xl">
                  {data?.food ? <CountUp end={data?.food} separator="," /> : 0}
                </span>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="border-2 rounded-md ms-5 flex justify-end">
                <CiViewTimeline size={50} className="text-main" />
              </div>
              <div className="flex flex-col justify-center items-start   ms-5">
                <span className=" font-medium">Số bàn đã đặt</span>
                <span className="font-medium text-xl">
                  {data?.table ? (
                    <CountUp end={data?.table} separator="," />
                  ) : (
                    0
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="border-2 rounded-md ms-5 flex justify-end">
                <CiViewTimeline size={50} className="text-main" />
              </div>
              <div className="flex flex-col justify-center items-start  ms-5">
                <span className=" font-medium">Số nhân viên</span>
                <span className="font-medium text-xl">
                  {data?.user ? <CountUp end={data?.user} separator="," /> : 0}
                </span>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 border-gray-400 border-solid">
            <span className="font-medium text-lg">
              Top 5 sản phẩm được ưa chuộng
            </span>
            <div className="overflow-hidden w-full ">
              <PieChart data={data?.productBySold || []} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
