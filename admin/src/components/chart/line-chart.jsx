import Chart from "react-apexcharts";
import { Select, Row, Col, Progress } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LineChart = ({ setTimeChart, timeChart, data }) => {
  const { montdPreAndCur, chart_order, order } = data;
  const handleChange = (value) => {
    setTimeChart(value);
  };
  return (
    <div className="w-full block max-h-[25rem] ">
      <Row
        align={"middle"}
        justify={"space-between"}
        className="px-4 mt-4"
        gutter={[0, 16]}
      >
        <Col xs={12} className="font-medium text-xl">
          Order Rate
        </Col>
        <Col xs={12} className="flex justify-end">
          <Select
            className="w-1/3"
            defaultValue={timeChart}
            onChange={handleChange}
            options={[
              {
                value: "MONTH",
                label: "Tháng",
              },
              {
                value: "YEAR",
                label: "Năm",
              },
            ]}
          />
        </Col>
        <Col md={12} xs={24}>
          <Row align={"center"}>
            <Col xs={3} className="flex justify-center items-center">
              <div className="w-full h-full flex justify-center items-center bg-main text-white rounded-md">
                <UserOutlined />
              </div>
            </Col>
            <Col xs={7} className="flex justify-center items-center">
              <div className="flex flex-col gap-2">
                <span className="text-gray-400 font-medium whitespace-nowrap">
                  Order total
                </span>
                <span className="font-medium">{order || 0}</span>
              </div>
            </Col>
            <Col xs={12} className="flex justify-center items-center">
              <div className="flex flex-col justify-between  border-2 w-full p-2 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-400">Target</span>
                  <span className="font-medium">100</span>
                </div>
                <Progress
                  percent={order}
                  showInfo={false}
                  className="m-0"
                  strokeColor="#FC8019"
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12} xs={24} className="flex justify-end gap-4">
          <Row className="w-2/5">
            <Col xs={6}>
              <div className="wc border-main mt-1"></div>
            </Col>
            <Col xs={18}>
              <div className="text-xs"> Month this</div>
              <div className="font-medium pt-1">{montdPreAndCur?.[1]?.total || 0}</div>
            </Col>
          </Row>
          <Row className="w-2/5">
            <Col xs={6}>
              <div className="wc border-main mt-1"></div>
            </Col>
            <Col xs={18}>
              <div className="text-xs">Last Month </div>
              <div className="font-medium pt-1">{montdPreAndCur?.[0]?.total || 0}</div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Chart
        className=" max-w-full overflow-hidden"
        options={{
          chart: {
            stacked: false,
            toolbar: { show: false },
            zoom: { enabled: false },
          },
          tooltip: { enabled: false },
          dataLabels: { enabled: true },
          xaxis: {
            type: "category",
            categories: chart_order?.labels || [],
          },
        }}
        series={[{ data: chart_order?.values || [] }]}
        type="area"
        height={300}
      />
    </div>
  );
};

export default LineChart;
