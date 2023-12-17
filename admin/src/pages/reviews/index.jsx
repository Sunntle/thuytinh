import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import { Col, Pagination, Popconfirm, Rate, Row, Select, message, Typography, Statistic, Button, Space } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import ColumnChart from "../../components/chart/column-chart";
import SearchComponent from "../../components/search";
import Spinner from "../../components/spinner";
import { deleteReview, getAllReviews } from "../../services/api";
import { desc, limit, month } from "../../utils/constant";
import { formatNgay, getDaysInMonth } from "../../utils/format";
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator="," />;
const options = month.map((el) => ({ value: el, label: `Tháng: ${el}` }));
const year = new Date().getFullYear()
const initMonth = new Date().getMonth() + 1

function ReviewsPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataChart, setDataChart] = useState([]);
  const [currentMonth, setMonth] = useState(initMonth);
  const [reviewsCurrent, setReviewsCurrent] = useState(null);
  const [filter, setFilter] = useState({
    _offset: 0,
    _limit: limit,
    _time: currentMonth,
  });
  const dayInMonth = useMemo(() => {
    return getDaysInMonth(year, currentMonth);
  }, [currentMonth]);
  
  const handleArrCategories = useMemo(() => {
    const numbersArray = [];
    for (let i = 1; i <= dayInMonth; i++) {
      numbersArray.push(i);
    }
    return numbersArray;
  },[dayInMonth])

  const fetchReviews = useCallback(async (params) => {
    const response = await getAllReviews(params);
    setReviewsCurrent(response);
  },[])

  const fetchData = useCallback(
    async (params = { _offset: 0, _limit: limit, _time: currentMonth }, isBeginLoading) => {
      !isBeginLoading && setLoading(true);
      try {
        const [response, countReviews, res] = await Promise.all([getAllReviews(params), getAllReviews({ _time: params._time }), getAllReviews({
          _time: currentMonth,
          _group: "createdAt",
        })])
        setReviewsCurrent(response)
        setReviews(countReviews)
        const arr = new Array(dayInMonth).fill(0);
        res?.total?.forEach((el) => {
          arr[+formatNgay(el.createdAt).substring(0, 2) - 1] += el.count;
        });
        setDataChart(arr);
        setFilter(params);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [currentMonth, dayInMonth]
  );

  const handleChangePage = useCallback((e) => {
    setPage(e);
    fetchReviews({ _offset: limit * (e - 1), _limit: limit, _time: currentMonth });
  },[fetchReviews, currentMonth])

  const handleChangeSelectMonth = useCallback((e) => {
    fetchData({ _offset: 0, _limit: limit, _time: e });
    setMonth(e);
  },[fetchData])

  const handleSearch = useCallback((kw) => {
    fetchReviews({ _offset: 0, _limit: limit, q: kw });
  },[fetchReviews]);

  const handleDeleteReview = useCallback(async (id) => {
    const res = await deleteReview(id);
    if(!res) {
      messageApi.open({ type: "error", content: res });
      return
    }
   await messageApi.open({ type: "success", content: res })
   fetchData(filter, true)
  },[fetchData, filter, messageApi]);

  const handleClear = useCallback(() => {
    fetchReviews({ _offset: 0, _limit: limit, _time: currentMonth });
  },[currentMonth, fetchReviews])
  
  const handleCancelConfirm = useCallback(() => {
    messageApi.open({type: "error", content: "Xóa thất bại"});
  },[messageApi])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Spinner />;
  
  return (
    <div className="my-7 px-5">
      <div className="p-5 mb-6 rounded-md border border-solid border-gray-300">
      {contextHolder}
        <Row align={"middle"} justify={"center"}>
          <Col sm={24} md={8}>
            <Typography.Title level={2}>
              Phản hồi từ khách hàng
            </Typography.Title>
            <p className="text-gray-500 mb-6">
              {formatNgay(new Date(), "HH:mm DD-MM-YYYY")}
            </p>
            <h4 className="lg:text-xl text-gray-700 mb-3 font-semibold">
              <Select
                onChange={handleChangeSelectMonth}
                value={currentMonth}
                options={options}
                className="lg:text-xl text-gray-700 mb-3 font-semibold"
              ></Select>
            </h4>
            <div className="flex items-baseline">
            <Statistic
              value={reviews?.total}
              formatter={formatter}
              valueStyle={{margin: "0.2em"}}
            />
            <span>lượt đánh giá</span>
            <Statistic
              value={reviews?.percentChange}
              valueStyle={reviews?.percentChange >= 0 ? {
                color: "#22C55E", margin: "0.5em", fontWeight: 600 
              } : { color: "#EF4444", margin: "0.5em", fontWeight: 600 }}
              suffix={
                <div>
                  %{" "}
                  {reviews?.percentChange >= 0 ? (
                    <UpCircleFilled
                      className="text-2xl"
                      style={{ color: "#22C55E" }}
                    />
                  ) : (
                    <DownCircleFilled
                      className="text-2xl"
                      style={{ color: "#EF4444" }}
                    />
                  )}
    
                </div>
              }
            />
            <span>so với tháng trước</span>
            </div>
          </Col>
          <Col sm={24} md={16}>
            <ColumnChart
              series={[
                {
                  name: "Bình luận",
                  data: dataChart,
                },
              ]}
              colors={["#22C55E"]}
              categories={handleArrCategories}
              tooltip={{
                x: {
                  formatter: function (value) {
                    return `${value}/${currentMonth}/${year}`;
                  },
                },
              }}
              responsive={[
                {
                  breakpoint: 1135,
                  options: {
                    xaxis: { tickAmount: 5 },
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </div>
      <div className="mb-6 p-5 rounded-md border border-solid border-gray-300">
        <Typography.Title level={3}>Đánh giá gần đây</Typography.Title>
        <SearchComponent
          className="max-w-md"
          onChange={handleSearch}
          customContent={() => <div></div>}
          onClear={handleClear}
        />
        <Row gutter={[20, 20]} className="my-6">
          {reviewsCurrent?.data?.map((el, index) => {
            return (
              <Col key={index} xs={24} sm={12} lg={8}>
                <div className="p-8 rounded-md border border-solid border-gray-300">
                  <Row
                    gutter={[20, 20]}
                    justify="space-between"
                    align={"middle"}
                  >
                    <Col xs="12">
                      <Row
                        gutter={[20, 20]}
                        align={"middle"}
                        className="border-b border-b-gray-50"
                      >
                        <Col xs="24" md="8">
                          <img
                            className="w-[70px] h-[70px] object-cover rounded-lg"
                            src="https://fooddesk.dexignlab.com/react/demo/static/media/pic-1.6923efd54fb9b8adcb78.jpg"
                            alt=""
                          />
                        </Col>
                        <Col xs="12" md="8">
                          <Typography.Title level={4}>
                            {el.name}
                          </Typography.Title>
                          <p className="text-gray-500 my-2">
                            {formatNgay(el.createdAt, "HH:mm DD-MM-YYYY")}
                          </p>
                          <div className="my-3 text-center">
                    <Rate
                      tooltips={desc}
                      className="text-main"
                      value={el.rate}
                      disabled
                    />
                    {el.rate ? (
                      <span className="ant-rate-text text-main capitalize">
                        {desc[el.rate - 1]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs="12">
                      
                    </Col>
                  </Row>
                  <Typography.Paragraph className=" h-16">
                    {el.description}
                  </Typography.Paragraph>
                  <Space className="text-gray-500 flex justify-between items-center font-semibold">
                    {formatNgay(el["order.createdAt"])}
                    <Popconfirm
                        title="Xóa đánh giá này"
                        description="Bạn chắc chắn muốn xóa bình luận này?"
                        onConfirm={() => handleDeleteReview(el.id)}
                        onCancel={handleCancelConfirm}
                        okText="Xóa"
                        cancelText="Hủy"
                      >
                        <Button type="link" className="font-semibold">Xóa</Button>
                      </Popconfirm>
                  </Space>
                </div>
              </Col>
            );
          })}
        </Row>
        <div className="flex items-center justify-between">
          <h6 className="text-gray-500">
            Thể hiện {reviewsCurrent?.data?.length ?? 0}/{limit * page} trên tổng số{" "}
            {reviewsCurrent?.total} kết quả
          </h6>
          <Pagination
            defaultPageSize={limit}
            defaultCurrent={page}
            onChange={handleChangePage}
            total={reviewsCurrent?.total}
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
