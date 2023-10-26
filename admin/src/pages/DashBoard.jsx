import { CiViewTimeline } from "react-icons/ci";
import PieChart from "../components/chart/pie-chart";
import LineChart from "../components/chart/line-chart";
import { Col, Row, Badge } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from "react";
import { getAllProduct, getDataDashboard } from "../services/api";
import { formatGia } from "../utils/format";
import { useCallback } from "react";
import Spinner from "../components/spinner"
const img =
  "https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000";
const DashBoard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true)
  const [timeChart, setTimeChart] = useState("MONTH");
  const [dataProduct, setDataProduct] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [res1, res2] = await Promise.all([getDataDashboard(timeChart), getAllProduct({
        _sort: "sold",
        _order: "DESC",
        _sold: "gte_0",
        _limit: 10,
      })])
      setData(res1);
      setDataProduct(res2.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [timeChart])

  useEffect(() => {
    fetchData();
  }, [timeChart])

  if (loading) return <Spinner />
  return (
    <div className="w-full my-7 px-5">
      <Row gutter={[32, 16]}>
        <Col xs={24} lg={16}>
          <div className="rounded-lg border-orange-400 border-2 bg-orange-100 dark:bg-darkModeBgBox flex-row flex items-center h-24">
            <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2">
              <span className="font-medium text-sm text-center ">Tổng thu nhập</span>
              <p className="text-orange-400 text-lg font-medium text-center">54000000</p>
            </div>
            <div className="w-1/3  p-4 h-full flex flex-col justify-center items gap-1">
              <span className="font-medium text-sm text-center">Thu nhập</span>
              <p className="text-lg font-medium text-green-500 text-center">54000000</p>
            </div>
            <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1">
              <span className="font-medium text-sm text-center">Chi phí</span>
              <p className="text-lg font-medium text-red-500 text-center">54000000</p>
            </div>
          </div>
          <div className="max-w-full mt-4 rounded-lg border-gray-400 border-solid border-2">
            <LineChart timeChart={timeChart} setTimeChart={setTimeChart} data={data} />
          </div>

          <div className="save-product w-full mt-4">
            <div className='w-full'>
              <div className='text-2xl text-center p-5'>Món ăn phổ biến</div>
              <Swiper
                modules={[Autoplay]}
                autoplay={true}
                spaceBetween={50}
                slidesPerView={3}
              >
                {dataProduct?.map((item, index) => (

                  <SwiperSlide key={index}>
                    <div className="w-full pe-5">
                      <Badge.Ribbon text="Hot" color="red">
                        <div className=' border-2 border-gray-300 px-4 py-2 rounded-lg'>
                          <img src={item.imageUrls} />
                          <div className=' font-medium'>{item.name_product}</div>
                          <div className='flex justify-between items-center  '>
                            <p className=' font-medium text-main text-lg'>{formatGia(item.price)}</p>
                          </div>
                        </div>
                      </Badge.Ribbon>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="recent_order w-full  mt-4">
            <div className="flex justify-between py-3">
              <span>Recent Order</span>
              <span className="text-main">View all </span>
            </div>
            <Row className="w-full" gutter={[8, 16]}>
              <Col md={8} xs={24} className=" border-2 border-gray-300 w-1/3 p-2 rounded-lg">
                <img src={img} />
                <p className="text-center font-medium">Reeeffaegf rgar</p>
                <p className="text-center font-medium text-main text-lg"> 500000 d</p>
                <div className="flex justify-center ">
                  <span className="w-1/3 text-center font-medium">4,8 km</span>
                  <span className="w-1/3 text-center text-gray-500">21 min</span>
                </div>
              </Col>
              <Col md={8} xs={24} className=" border-2 border-gray-300 w-1/3 p-2 rounded-lg">
                <img src={img} />
                <p className="text-center font-medium">Reeeffaegf rgar</p>
                <p className="text-center font-medium text-main text-lg"> 500000 d</p>
                <div className="flex justify-center ">
                  <span className="w-1/3 text-center font-medium">4,8 km</span>
                  <span className="w-1/3 text-center text-gray-500">21 min</span>
                </div>
              </Col>
              <Col md={8} xs={24} className=" border-2 border-gray-300 w-1/3 p-2 rounded-lg">
                <img src={img} />
                <p className="text-center font-medium">Reeeffaegf rgar</p>
                <p className="text-center font-medium text-main text-lg"> 500000 d</p>
                <div className="flex justify-center ">
                  <span className="w-1/3 text-center font-medium">4,8 km</span>
                  <span className="w-1/3 text-center text-gray-500">21 min</span>
                </div>
              </Col>
            </Row>
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
