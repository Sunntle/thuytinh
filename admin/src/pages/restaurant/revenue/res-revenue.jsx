import { Avatar, Badge, Col, List, Row, Table, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import "swiper/css/autoplay";
import {
  calculateDailyRevenue,
  calculateWeeklyRevenue,
} from "../../../utils/format";
import {
  getAllOrder,
  getAllUser,
  getDataDashboard,
} from "../../../services/api";
import PieChart from "../../../components/chart/pie-chart";
import LineChart from "../../../components/chart/line-chart";
import { socket } from "../../../socket";

const ResRevenue = () => {
  const [revenue, setRevenue] = useState({ daily: 0, weekly: 0 });
  const [data, setData] = useState({});
  const [timeChart, setTimeChart] = useState("MONTH");
  const [admin, setAdmin] = useState(null);

  const fetchData = useCallback(async () => {
    try{
        // const res = await getDataDashboard(timeChart);
        const { data } = await getAllOrder();
        const dataAdmin = await getAllUser({ _like: "role_R1_not" });
        const daily = calculateDailyRevenue(data);
        const weekly = calculateWeeklyRevenue(data);
        dataAdmin.success && setAdmin(dataAdmin);
        setRevenue({ data, daily, weekly });
        // setData(res);
    }catch(err){
        console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [timeChart, fetchData]);

  const columns = useMemo(
    () => [
      {
        title: "Mã đơn hàng",
        dataIndex: "id",
      },
      {
        title: "Bàn",
        dataIndex: "id_table",
      },
      {
        title: "Thanh toán",
        dataIndex: "payment",
      },
      {
        title: "Thời gian",
        dataIndex: "date_order",
      },
      {
        title: "Tổng tiền",
        dataIndex: "total",
      },
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
            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-50 flex-row flex items-center h-24">
              <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2">
                <span className="text-black font-medium text-sm text-center ">
                  Tổng tháng
                </span>
                <p className="text-orange-400 text-2xl font-medium text-center">
                  54000000
                </p>
              </div>
              <div className="w-1/3  p-4 h-full flex flex-col justify-center items gap-1">
                <span className="text-black font-medium text-sm text-center">
                  Tổng tiền tuần
                </span>
                <p className="text-2xl font-medium text-green-500 text-center">
                  {revenue.weekly}
                </p>
              </div>
              <div className="w-1/3 p-4 h-full flex flex-col justify-center items  gap-1">
                <span className="text-black font-medium text-sm text-center">
                  Tổng tiền ngày
                </span>
                <p className="text-2xl font-medium text-red-500 text-center">
                  {revenue.daily}
                </p>
              </div>
            </div>
            <div className="chart-line_area mt-4 rounded-lg">
              <LineChart
                timeChart={timeChart}
                setTimeChart={setTimeChart}
                data={data}
              />
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className="rounded-lg border-solid border-orange-400 border-2 bg-orange-50 flex-row flex items-center h-24">
              <div className="w-1/2 p-4 h-full flex flex-col justify-center items  gap-1 border-r-2">
                <span className="text-black font-medium text-sm text-center ">
                  Số đơn
                </span>
                <p className="text-orange-400 text-2xl font-medium text-center">
                  56
                </p>
              </div>
              <div className="w-1/2  p-4 h-full flex flex-col justify-center items gap-1">
                <span className="text-black font-medium text-sm text-center">
                  Số khách hàng
                </span>
                <p className="text-2xl font-medium text-green-500 text-center">
                  150
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
                    <List.Item.Meta style={{alignItems: "center"}}
                      avatar={
                        <Badge dot color={item.status &&"green"} status={item.status &&"processing"} offset={[-3, 33]}>
                          <Avatar src={item.data} size={"large"}/>
                        </Badge>
                      }
                      title={<span>{item.name}</span>}
                      description={
                        item.status? <Typography.Text type="success">
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
                  <PieChart data={data?.category || []} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Table className="mt-4" columns={columns} rowKey={"id"} />
      </div>
    </div>
  );
};
export default ResRevenue;
