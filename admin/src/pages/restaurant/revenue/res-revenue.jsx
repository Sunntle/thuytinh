import { Badge, Col, Rate, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// import {Autoplay} from 'swiper';
import { PlusOutlined } from '@ant-design/icons';
import 'swiper/css/autoplay';
import { CiViewTimeline } from 'react-icons/ci';
import { getAllOrder } from '../../../services/api';
const img = 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000'


const ResRevenue = () => {
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
    const [totalOrder, setOrder] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const resOrder = await getAllOrder();
            setOrder(resOrder);
        }
        fetchData();
    }, []);
// TỔNG DANH THU NGÀY
// function calculateDailyRevenue(transactions, targetDate) {
//     let dailyRevenue = 0;
//     for (const totalOrder of transactions) {
//         const transactionDate = new Date(totalOrder.createdAt);
//         if (transactionDate.toDateString() === targetDate.toDateString()) {
//             dailyRevenue += totalOrder.total;
//         }
//     }
//     return dailyRevenue;
// }
// const targetDate = new Date();
// const dailyRevenue = calculateDailyRevenue(totalOrder, targetDate);
// console.log(`Tổng doanh thu cho ngày ${targetDate.toDateString()}: $${dailyRevenue}`);


// TỔNG DANH THU TUẦN
    // function calculateWeeklyRevenue(transactions) {
    //     const today = new Date();
    //     const dayOfWeek = today.getDay();
    //     const startDate = new Date(today);
    //     startDate.setDate(today.getDate() - dayOfWeek);

    //     const endDate = new Date(today);
    //     endDate.setDate(today.getDate() - dayOfWeek + 7);

    //     let weeklyRevenue = 0;

    //     for (const totalOrder of transactions) {
    //         const transactionDate = new Date(totalOrder.date_order);
    //         if (transactionDate >= startDate && transactionDate <= endDate) {
    //             weeklyRevenue += totalOrder.total;
    //         }
    //     }
    //     return weeklyRevenue;
    // }
    // const weeklyRevenue = calculateWeeklyRevenue(totalOrder);
    // console.log(`Tổng doanh thu trong tuần này: $${weeklyRevenue}`);

    
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
                                    <p className='text-2xl font-medium text-green-500 text-center'>0</p>
                                </div>
                                <div className='w-1/3 p-4 h-full flex flex-col justify-center items  gap-1'>
                                    <span className='text-black font-medium text-sm text-center'>
                                        Tổng tiền ngày
                                    </span>
                                    <p className='text-2xl font-medium text-red-500 text-center'>0</p>
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className='text-2xl text-center p-5'>Món ăn phổ biến</div>
                                <Swiper
                                    modules={[Autoplay]}
                                    autoplay={true}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                >
                                    <SwiperSlide>
                                        <div className="w-full pe-5">
                                            <Badge.Ribbon text="Hot" color="red">
                                                <div className=' border-2 border-gray-300 px-4 py-2 rounded-lg'>
                                                    <img src={img} />
                                                    <div className=' font-medium'><Rate disabled defaultValue={2} className='text-main' /></div>
                                                    <div className=' font-medium'>Banhs pizaa</div>
                                                    <div className='flex justify-between items-center  '>
                                                        <p className=' font-medium text-main text-lg'> 500000 d</p>
                                                        <div className=''>
                                                            <PlusOutlined size={30} className='p-3 bg-main rounded-lg text-white' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Badge.Ribbon>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-full pe-5">
                                            <Badge.Ribbon text="Hot" color="red">
                                                <div className=' border-2 border-gray-300 px-4 py-2 rounded-lg'>
                                                    <img src={img} />
                                                    <div className=' font-medium'><Rate disabled defaultValue={2} className='text-main' /></div>
                                                    <div className=' font-medium'>Banhs pizaa</div>
                                                    <div className='flex justify-between items-center  '>
                                                        <p className=' font-medium text-main text-lg'> 500000 d</p>
                                                        <div className=''>
                                                            <PlusOutlined size={30} className='p-3 bg-main rounded-lg text-white' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Badge.Ribbon>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-full pe-5">
                                            <Badge.Ribbon text="Hot" color="red">
                                                <div className=' border-2 border-gray-300 px-4 py-2 rounded-lg'>
                                                    <img src={img} />
                                                    <div className=' font-medium'><Rate disabled defaultValue={2} className='text-main' /></div>
                                                    <div className=' font-medium'>Banhs pizaa</div>
                                                    <div className='flex justify-between items-center  '>
                                                        <p className=' font-medium text-main text-lg'> 500000 d</p>
                                                        <div className=''>
                                                            <PlusOutlined size={30} className='p-3 bg-main rounded-lg text-white' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Badge.Ribbon>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-full pe-5">
                                            <Badge.Ribbon text="Hot" color="red">
                                                <div className=' border-2 border-gray-300 px-4 py-2 rounded-lg'>
                                                    <img src={img} />
                                                    <div className=' font-medium'><Rate disabled defaultValue={2} className='text-main' /></div>
                                                    <div className=' font-medium'>Banhs pizaa</div>
                                                    <div className='flex justify-between items-center  '>
                                                        <p className=' font-medium text-main text-lg'> 500000 d</p>
                                                        <div className=''>
                                                            <PlusOutlined size={30} className='p-3 bg-main rounded-lg text-white' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Badge.Ribbon>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-full pe-5">
                                            <Badge.Ribbon text="Hot" color="red">
                                                <div className=' border-2 border-gray-300 px-4 py-2 rounded-lg'>
                                                    <img src={img} />
                                                    <div className=' font-medium'><Rate disabled defaultValue={2} className='text-main' /></div>
                                                    <div className=' font-medium'>Banhs pizaa</div>
                                                    <div className='flex justify-between items-center  '>
                                                        <p className=' font-medium text-main text-lg'> 500000 d</p>
                                                        <div className=''>
                                                            <PlusOutlined size={30} className='p-3 bg-main rounded-lg text-white' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Badge.Ribbon>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="w-full pe-5">
                                            <Badge.Ribbon text="Hot" color="red">
                                                <div className=' border-2 border-gray-300 px-4 py-2 rounded-lg'>
                                                    <img src={img} />
                                                    <div className=' font-medium'><Rate disabled defaultValue={2} className='text-main' /></div>
                                                    <div className=' font-medium'>Banhs pizaa</div>
                                                    <div className='flex justify-between items-center  '>
                                                        <p className=' font-medium text-main text-lg'> 500000 d</p>
                                                        <div className=''>
                                                            <PlusOutlined size={30} className='p-3 bg-main rounded-lg text-white' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Badge.Ribbon>
                                        </div>
                                    </SwiperSlide>

                                </Swiper>
                            </div>
                        </Col>
                        <Col xs={24} lg={8}>
                            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-50 flex-row flex items-center h-24">
                                <div className='w-1/2 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2'>
                                    <span className='text-black font-medium text-sm text-center '>
                                        Số đơn
                                    </span>
                                    <p className='text-orange-400 text-2xl font-medium text-center'>56</p>
                                </div>
                                <div className='w-1/2  p-4 h-full flex flex-col justify-center items gap-1'>
                                    <span className='text-black font-medium text-sm text-center'>
                                        Số khách hàng
                                    </span>
                                    <p className='text-2xl font-medium text-green-500 text-center'>150</p>
                                </div>
                            </div>
                            <div className='flex flex-col mt-6 border-solid border-2 rounded border-orange-400'>
                                <div className='flex flex-row my-3'>
                                    <div className=' border-2 rounded-md ms-5 flex justify-end'>
                                        <CiViewTimeline size={40} className='text-main' />
                                    </div>
                                    <div className='flex flex-col justify-center items-start  ms-5'>
                                        <span className='text-neutral-500 font-medium'>Cá</span>
                                        <span className=' text-gray-500 font-medium mt-1'>123</span>
                                    </div>
                                </div>
                                <div className='flex flex-row my-3'>
                                    <div className=' border-2 rounded-md ms-5 flex justify-end'>
                                        <CiViewTimeline size={40} className='text-main' />
                                    </div>
                                    <div className='flex flex-col justify-center items-start  ms-5'>
                                        <span className='text-neutral-500 font-medium'>Tôm</span>
                                        <span className=' text-gray-500 font-medium mt-1'>123</span>
                                    </div>
                                </div>
                                <div className='flex flex-row my-3'>
                                    <div className=' border-2 rounded-md ms-5 flex justify-end'>
                                        <CiViewTimeline size={40} className='text-main' />
                                    </div>
                                    <div className='flex flex-col justify-center items-start  ms-5'>
                                        <span className='text-neutral-500 font-medium'>Cua</span>
                                        <span className=' text-gray-500 font-medium mt-1'>123</span>
                                    </div>
                                </div>
                                <div className='flex flex-row my-3'>
                                    <div className=' border-2 rounded-md ms-5 flex justify-end'>
                                        <CiViewTimeline size={40} className='text-main' />
                                    </div>
                                    <div className='flex flex-col justify-center items-start  ms-5'>
                                        <span className='text-neutral-500 font-medium'>Gà</span>
                                        <span className=' text-gray-500 font-medium mt-1'>123</span>
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
