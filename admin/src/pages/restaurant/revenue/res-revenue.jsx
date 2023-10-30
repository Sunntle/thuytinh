import { Avatar, Badge, Col, List, Row, Table, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import "swiper/css/autoplay";
import {
  calculateDailyRevenue,
  calculateWeeklyRevenue,
  calculateMonthlyRevenue,
  formatGia,
  formatNgay,
} from "../../../utils/format";
import {
  getAllOrder,
  getAllUser,
  getDataDashboard,
  getAllMaterial,
} from "../../../services/api";
import PieChart from "../../../components/chart/pie-chart";
import LineChart from "../../../components/chart/line-chart";
import { socket } from "../../../socket";
import ColumnChart from "../../../components/chart/column-chart";

const ResRevenue = () => {
  const [revenue, setRevenue] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [data, setData] = useState({});
  const [timeChart, setTimeChart] = useState("MONTH");
  const [admin, setAdmin] = useState(null);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataChart, setDataChart] = useState([])
  console.log(data)

  const fetchData = useCallback(async () => {
    try {
      // const res = await getDataDashboard(timeChart);
      const [{ data }, res1, dataAdmin, res] = await Promise.all([getAllOrder(), getDataDashboard(timeChart), getAllUser({ _like: "role_R1_not" }), getAllMaterial()])
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
      setDataChart(res.dataChart);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [timeChart, fetchData]);

  const columns = useMemo(
    () => [
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
                  {formatGia(revenue.monthly)}
                </p>
              </div>
              <div className="w-1/3  p-4 h-full flex flex-col justify-center items gap-1">
                <span className=" font-medium text-sm text-center">
                  Tổng tiền tuần
                </span>
                <p className="text-2xl font-medium text-green-500 text-center">
                  {formatGia(revenue.weekly)}
                </p>
              </div>
              <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1">
                <span className=" font-medium text-sm text-center">
                  Tổng tiền ngày
                </span>
                <p className="text-2xl font-medium text-red-500 text-center">
                  {formatGia(revenue.daily)}
                </p>
              </div>
            </div>
            <div className="chart-line_area mt-4 rounded-lg border-solid border-2 border-orange-400">
              <LineChart
                timeChart={timeChart}
                setTimeChart={setTimeChart}
                data={data}
              />
            </div>
            <div className='mt-6 border-solid border-2 rounded border-orange-400'>
          <div className="m-4 text-lg font-medium">Nguyên liệu sắp hết</div>
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
