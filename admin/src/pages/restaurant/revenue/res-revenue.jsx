import { Badge, Col, Rate, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { PlusOutlined } from '@ant-design/icons';
import 'swiper/css/autoplay';
import { CiViewTimeline } from 'react-icons/ci';
import { calculateDailyRevenue, calculateWeeklyRevenue, formatGia } from '../../../utils/format';
import { getAllOrder, getAllProduct, getDataDashboard } from '../../../services/api';
import PieChart from '../../../components/chart/pie-chart';
import LineChart from '../../../components/chart/line-chart';
const img = 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000'


const ResRevenue = () => {
    const [totalOrder, setTotalOrder] = useState([]);
    const [revenue, setRevenue] = useState({ daily: 0, weekly: 0 });
    const [data, setData] = useState({});
    const [timeChart, setTimeChart] = useState("MONTH");
    const [dataProduct, setDataProduct] = useState();

    useEffect(() => {
        fetchData();
    }, [timeChart])
    const fetchData = async () => {
        const res = await getDataDashboard(timeChart);
        const { data: dataPr } = await getAllProduct({
            _sort: "sold",
            _order: "DESC",
            _sold: "gte_0",
            _limit: 10,
        });
        setData(res)
        setDataProduct(dataPr)
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            // render: (_, record) => (
            //     <span className='font-medium cursor-pointer' onClick={() => showDetail(record)}>TTLGH{record.id}</span>
            // )
        },
        {
            title: 'Bàn',
            dataIndex: 'id_table',
        },
        {
            title: 'Thanh toán',
            dataIndex: 'payment',
        },
        {
            title: 'Thời gian',
            dataIndex: 'date_order',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            // render: (_, record) => (
            //     <span className='text-main font-medium text-lg'>{formatGia(record.total)}</span>
            // )
        },
        {
            title: 'Điều chỉnh',
            key: 'action',
            render: (_, record) => (
                <div className='h-10 flex items-center cursor-pointer'>
                    <span className='bg-orange-500 px-4 rounded-md py-2 text-white' onClick={() => showModalUpdate(record)} >Sửa</span>
                    <ConfirmComponent title="Xác nhận xóa đơn hàng" confirm={() => handDeleteOrder(record.id)} >Xóa</ConfirmComponent>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getAllOrder();
            setTotalOrder(data);
            const daily = calculateDailyRevenue(data);
            const weekly = calculateWeeklyRevenue(data);
            setRevenue({ daily, weekly });
        }
        fetchData();
    }, []);

    return (
        <>
            <div className='w-full p-10'>
                <div className='pt-5'>
                    <Row gutter={[32, 16]}>
                        <Col xs={24} lg={16}>
                            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-50 flex-row flex items-center h-24">
                                <div className='w-1/3 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2'>
                                    <span className='text-black font-medium text-sm text-center '>
                                        Tổng tháng
                                    </span>
                                    <p className='text-orange-400 text-2xl font-medium text-center'>54000000</p>
                                </div>
                                <div className='w-1/3  p-4 h-full flex flex-col justify-center items gap-1'>
                                    <span className='text-black font-medium text-sm text-center'>
                                        Tổng tiền tuần
                                    </span>
                                    <p className='text-2xl font-medium text-green-500 text-center'>{revenue.weekly}</p>
                                </div>
                                <div className='w-1/3 p-4 h-full flex flex-col justify-center items  gap-1'>
                                    <span className='text-black font-medium text-sm text-center'>
                                        Tổng tiền ngày
                                    </span>
                                    <p className='text-2xl font-medium text-red-500 text-center'>{revenue.daily}</p>
                                </div>
                            </div>
                            <div className="chart-line_area mt-4 rounded-lg">
                                <LineChart timeChart={timeChart} setTimeChart={setTimeChart} data={data} />
                            </div>                            <div className='w-full'>
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
                                                        <img src={item.ImageProducts[0]?.url} />
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
                        </Col>
                        <Col xs={24} lg={8}>
                            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-50 flex-row flex items-center h-24">
                                <div className='w-1/2 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2'>
                                    <span className='text-black font-medium text-sm text-center '>
                                        Số đơn
                                    </span>
                                    <p className='text-orange-400 text-2xl font-medium text-center'>{data?.order}</p>
                                </div>
                                <div className='w-1/2  p-4 h-full flex flex-col justify-center items gap-1'>
                                    <span className='text-black font-medium text-sm text-center'>
                                        Số khách hàng
                                    </span>
                                    <p className='text-2xl font-medium text-green-500 text-center'>150</p>
                                </div>
                            </div>
                            <div className='flex flex-col mt-6 border-solid border-2 rounded border-orange-400'>
                                <div className="border-2 rounded-lg p-4 ">
                                    <span className="font-medium text-lg">Món ăn phổ biến</span>
                                    <div className="overflow-hidden w-full p-2">
                                        <PieChart data={data?.category || []} />
                                    </div>
                                </div>
                            </div>

                        </Col>
                    </Row>
                    <Table className='mt-4' columns={columns} rowKey={'id'} />
                </div>

            </div>

        </>
    )
}
export default ResRevenue
