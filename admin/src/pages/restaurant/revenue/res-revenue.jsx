import { Badge, Col, Input, Rate, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import 'swiper/css/autoplay';
import { calculateDailyRevenue, calculateMonthlyRevenue, calculateWeeklyRevenue, formatGia, formatNgay } from '../../../utils/format';
import { getAllMaterial, getAllOrder, getAllProduct, getDataDashboard } from '../../../services/api';
import LineChart from '../../../components/chart/line-chart';
import ColumnChart from '../../../components/chart/column-chart';
const img = 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000'


const ResRevenue = () => {
    const [totalOrder, setTotalOrder] = useState([]);
    const [revenue, setRevenue] = useState({ daily: 0, weekly: 0 });
    const [data, setData] = useState({});
    const [timeChart, setTimeChart] = useState("MONTH");
    const [dataProduct, setDataProduct] = useState();
    const [dataOrder, setDataOrder] = useState([]);
    const [dataChart, setDataChart] = useState([])
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchData();
    }, [timeChart, dataOrder])
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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={handleReset}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => text

    });

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            render: (_, record) => (
                <span className='font-medium cursor-pointer' onClick={() => showDetail(record)}>TTLGH{record.id}</span>
            )
        },
        {
            title: 'Khách hàng',
            dataIndex: 'name',
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            // ...getColumnSearchProps('phone'),
        },
        {
            title: 'Người phụ trách',
            dataIndex: 'employee',
            // ...getColumnSearchProps('employee'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            align: "center ",
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Bàn',
            dataIndex: 'table',
            align: "center "
        },
        {
            title: 'Thanh toán',
            dataIndex: 'payment',
            align: "center "
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt)
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            render: (_, record) => (
                <span className='text-main font-medium text-lg'>{formatGia(record.total)}</span>
            )
        }

    ];

    useEffect(() => {
        const fetchData = async (query) => {
            const { data, total } = await getAllOrder();
            setTotalOrder(data);
            const daily = calculateDailyRevenue(data);
            const weekly = calculateWeeklyRevenue(data);
            const monthly = calculateMonthlyRevenue(data)
            setRevenue({ daily, weekly ,monthly });
            const avl = total > 0 && data?.map((item) => {
                let data = {
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    user: item.name,
                    total: item.total,
                    table: item?.TableByOrders?.map(i => i.tableId).join(", "),
                    employee: item?.User?.name,
                    id_employee: item.id_employee,
                    payment: item.payment,
                    createdAt: formatNgay(item.createdAt),
                    quantity: item?.order_details.reduce((a, b) => a + b?.quantity, 0),
                    meta: { ...item, table: item?.TableByOrders?.map(i => i.tableId.toString()) },
                };
                return data;
            });
            setDataOrder(avl);
            const res = await getAllMaterial();
            setDataChart(res.dataChart);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className='w-full p-10'>
                <div className='pt-5'>
                    <Row gutter={[32, 16]}>
                        <Col xs={24} lg={16}>
                            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-100 dark:bg-darkModeBgBox flex-row flex items-center h-24">
                                <div className='w-1/3 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2'>
                                    <span className=' font-medium text-sm text-center '>
                                        Tổng tháng
                                    </span>
                                    <p className='text-orange-400 text-2xl font-medium text-center'>{formatGia(revenue.monthly)}</p>
                                </div>
                                <div className='w-1/3  p-4 h-full flex flex-col justify-center items gap-1'>
                                    <span className=' font-medium text-sm text-center'>
                                        Tổng tiền tuần
                                    </span>
                                    <p className='text-2xl font-medium text-green-500 text-center'>{formatGia(revenue.weekly)}</p>
                                </div>
                                <div className='w-1/3 p-4 h-full flex flex-col justify-center items  gap-1'>
                                    <span className='font-medium text-sm text-center'>
                                        Tổng tiền ngày
                                    </span>
                                    <p className='text-2xl font-medium text-red-500 text-center'>{formatGia(revenue.daily)}</p>
                                </div>
                            </div>
                            <div className="chart-line_area mt-4 rounded-lg border-solid border-2 border-orange-400">
                                <LineChart timeChart={timeChart} setTimeChart={setTimeChart} data={data} />
                            </div>
                        </Col>
                        <Col xs={24} lg={8}>
                            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-100 dark:bg-darkModeBgBox flex-row flex items-center h-24">
                                <div className='w-1/2 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2'>
                                    <span className=' font-medium text-sm text-center '>
                                        Số đơn
                                    </span>
                                    <p className='text-orange-400 text-2xl font-medium text-center'>{totalOrder.length || '0'}</p>
                                </div>
                                <div className='w-1/2  p-4 h-full flex flex-col justify-center items gap-1'>
                                    <span className=' font-medium text-sm text-center'>
                                        Số nguyên liệu sắp hết
                                    </span>
                                    <p className='text-2xl font-medium text-green-500 text-center'>{dataChart.length || '0'}</p>
                                </div>
                            </div>
                            {/* <div className='flex flex-col mt-6 border-solid border-2 rounded border-orange-400'>
                                <div className="border-2 rounded-lg p-4 ">
                                    <span className="font-medium text-lg">Món ăn phổ biến</span>
                                    <div className="overflow-hidden w-full p-2">
                                        <MeterialChart dataChart={dataChart || []} />
                                    </div>
                                </div>
                            </div> */}

                        </Col>
                    </Row>
                    <div className='mt-6 border-solid border-2 rounded border-orange-400'>
                    <div className="m-4 font-medium text-lg font-medium">Nguyên liệu sắp hết</div>
                        <ColumnChart
                        customClassName='max-w-full'
                            series={[
                                {
                                    name: "Nguyên liệu gần hết",
                                    data: dataChart.map((item) => item.amount),
                                },
                            ]}
                            colors="#fc8019"
                            categories={dataChart.map(
                                (item) => `${item.name_material} (${item.unit})`
                            )}
                        />
                    </div>
                    <Table className='mt-4' columns={columns} dataSource={dataOrder} rowKey={"id"} />
                </div>

            </div>

        </>
    )
}
export default ResRevenue
