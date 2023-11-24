import { Avatar, Badge, Col, List, Row, Table, Typography } from "antd";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css/autoplay";
import AreaChart from "../../../components/chart/area-chart";
import ColumnChart from "../../../components/chart/column-chart";
import PieChart from "../../../components/chart/pie-chart";
import {
  getAllMaterial,
  getAllOrder,
  getAllUser,
  getDataDashboard,
} from "../../../services/api";
import { socket } from "../../../socket";
import { renderToString } from "../../../utils/constant";
import {
  calculateDailyRevenue,
  calculateMonthlyRevenue,
  calculateWeeklyRevenue,
  formatGia,
  formatNgay,
} from "../../../utils/format";
import CountUp from 'react-countup';


const ResRevenue = () => {
  const [revenue, setRevenue] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [data, setData] = useState({});
  const [timeChart, setTimeChart] = useState("MONTH");
  const customize = useSelector(state => state.customize)
  const [admin, setAdmin] = useState(null);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const renderTextPay = (params) => {
    if (params) {
      if (params === "Cash") {
        return "Thanh toán tiền mặt";
      } else {
        return params;
      }
    } else {
      return "Chưa thanh toán";
    }
  };


  const fetchData = useCallback(async () => {
    try {
      const [{ data }, res1, dataAdmin, res] = await Promise.all([getAllOrder(), getDataDashboard({ weekcurrent: moment().week(), type: timeChart }), getAllUser({ _like: "role_R1_not" }), getAllMaterial()])
      const daily = calculateDailyRevenue(data);
      const weekly = calculateWeeklyRevenue(data);
      const monthly = calculateMonthlyRevenue(data)
      dataAdmin.success && setAdmin(dataAdmin);
      setRevenue({ data, daily, weekly, monthly });
      setData(res1);
      const avl = data?.map((item) => {
        let data = {
          id: item.id,
          name: item.name,
          phone: item.phone,
          user: item.name,
          total: item.total,
          table: item?.tablebyorders?.map(i => i.tableId).join(", "),
          employee: item?.user?.name,
          id_employee: item.id_employee,
          payment: renderTextPay(item.payment_gateway),
          createdAt: formatNgay(item.createdAt),
          quantity: item?.order_details.reduce((a, b) => a + b?.quantity, 0),
          meta: { ...item, table: item?.tablebyorders?.map(i => i.tableId.toString()) },
        };
        return data;
      });
      setDataOrder(avl);
      const convert = res.dataChart.map(i => {
        let q = { x: i.name_material, unit: i.unit, image: i.image }
        if (i.unit === "gram") {
          q = { ...q, y: i.amount / 1000, detail: `${i.unit} => kg` }
        } else {
          q = { ...q, y: i.amount }
        }
        return q
      })
      setDataChart(convert);
    } catch (err) {
      console.log(err);
    }
  }, [timeChart]);

  useEffect(() => {
    fetchData();
  }, [timeChart, fetchData]);
  const columns = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        dataIndex: 'id',
        render: (_, record) => (
          <span className='font-medium cursor-pointer'>TTLGH{record.id}</span>
        )
      },
      {
        title: 'Khách hàng',
        dataIndex: 'name',
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        render: (_, data) => (
          <span>{data.phone ? data.phone : "Không có số điện thoại"}</span>
        )
      },
      {
        title: 'Người phụ trách',
        dataIndex: 'employee',
        render: (_, data) => (
          <span>{data.employee ? data.employee : "Khách hàng"}</span>
        )
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
    ],
    []
  );
  useEffect(() => {
    socket.on("update-admin-online", (data) => {
      if (admin && admin.data) {
        const arrAdmin = [...admin.data];
        arrAdmin.forEach((itemA) => {
          const itemB = data.find((el) => el.id === itemA.id);
          if (itemB) {
            itemA.status = true;
          } else {
            itemA.status = false;
          }
        });
        setAdmin((prev) => ({ ...prev, data: arrAdmin }));
      }
    });
    return () => {
      socket.off("update-admin-online");
    };
  }, [admin]);
  return (
    <div className="w-full p-10">
      <div className="pt-5">
        <Row gutter={[32, 16]}>
          <Col xs={24} lg={16}>
            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-100 dark:bg-darkModeBgBox flex-row flex items-center h-24">
              <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2">
                <span className=" font-medium text-sm text-center ">
                  Tổng tháng
                </span>
                <p className="text-orange-400 text-2xl font-medium text-center">
                  {data.montdPreAndCur?.[0]?.total ? (
                    <CountUp
                      end={data.montdPreAndCur?.[0]?.total}
                      separator=","
                    />
                  ) : (
                    0
                  )}
                  {' '}
                  đ
                </p>
              </div>
              <div className="w-1/3  p-4 h-full flex flex-col justify-center items gap-1">
                <span className=" font-medium text-sm text-center">
                  Tổng tiền tuần
                </span>
                <p className="text-2xl font-medium text-green-500 text-center">
                  <CountUp
                    end={revenue.weekly || 0}
                    separator=","
                  />{' '}đ
                </p>
              </div>
              <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1">
                <span className=" font-medium text-sm text-center">
                  Tổng tiền ngày
                </span>
                <p className="text-2xl font-medium text-red-500 text-center">
                  <CountUp
                    end={revenue.daily}
                    separator=","
                  />{' '}đ
                </p>
              </div>
            </div>
            <div className="chart-line_area mt-4 rounded-lg border-solid border-2 border-orange-400">
              <AreaChart
                timeChart={timeChart}
                setTimeChart={setTimeChart}
                data={data}
              />
            </div>
            <div className='mt-6 border-solid border-2 rounded border-orange-400'>
              <div className="m-4 text-lg font-medium">Nguyên liệu sắp hết</div>
              <ColumnChart
                series={[
                  {
                    name: "Nguyên liệu gần hết",
                    data: dataChart.map((item) => item),
                  },
                ]}
                colors="#EF4444"
                columnWidth="20px"
                customOptions={{
                  yaxis: {
                    min: 0,
                    max: (max) => {
                      if (max == 0) return 20
                      return max;
                    },
                    tickAmount: 1,
                    labels: {
                      formatter: (val) => {
                        return val
                      }
                    },
                  },
                  xaxis: {
                    categories: dataChart.map(
                      (item) => item.x
                    ),
                  },

                  tooltip: {
                    theme: customize.darkMode ? 'dark' : 'light',
                    custom: function ({ _, seriesIndex, dataPointIndex, w }) {
                      let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                      return renderToString(data)
                    }
                  }

                }}
              />
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-100 dark:bg-darkModeBgBox flex-row flex items-center h-24">
              <div className="w-1/2 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2">
                <span className=" font-medium text-sm text-center ">
                  Số đơn
                </span>
                <p className="text-orange-400 text-2xl font-medium text-center">
                  {dataOrder.length || '0'}
                </p>
              </div>
              <div className="w-1/2  p-4 h-full flex flex-col justify-center items gap-1">
                <span className=" font-medium text-sm text-center">
                  Số nguyên liệu sắp hết
                </span>
                <p className="text-2xl font-medium text-green-500 text-center">
                  {dataChart.length || '0'}
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-6 border-solid border-2 rounded border-orange-400 p-4">
              <Typography.Title level={5}>
                Quản trị viên:
              </Typography.Title>
              <List
                itemLayout="horizontal"
                dataSource={admin?.data}
                renderItem={(item) => (
                  <List.Item key={item.id} >
                    <List.Item.Meta style={{ alignItems: "center" }}
                      avatar={
                        <Badge dot color={item.status && "green"} status={item.status && "processing"} offset={[-3, 33]}>
                          <Avatar src={item.data} size={"large"} />
                        </Badge>
                      }
                      title={<span>{item.name}</span>}
                      description={
                        item.status ? <Typography.Text type="success">
                          Đang hoạt động
                        </Typography.Text> : <Typography.Text type="danger">
                          Tạm vắng
                        </Typography.Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <div className="flex flex-col mt-6 border-solid border-2 rounded border-orange-400">
              <div className="border-2 rounded-lg p-4">
                <span className="font-medium text-lg">Món ăn phổ biến</span>
                <div className="overflow-hidden w-full p-2">
                  <PieChart data={data?.productBySold || []} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Table className='mt-4' columns={columns} dataSource={dataOrder} rowKey={"id"} />
      </div>
    </div>
  );
};
export default ResRevenue;
