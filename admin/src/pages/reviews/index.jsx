import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import { Col, Pagination, Rate, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import ButtonComponents from "../../components/button";
import ColumnChart from "../../components/chart/column-chart";
import SearchComponent from "../../components/search";
import Spinner from "../../components/spinner";
import { deleteReview, getAllReviews } from "../../services/api";
import { desc, limit, month } from "../../utils/constant";
import { formatNgay, getDaysInMonth } from "../../utils/format";
const options = month.map((el) => ({ value: el, label: `Tháng: ${el}` }));
function ReviewsPage() {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [dataChart, setDataChart] = useState([]);
  const [currentMonth, setMonth] = useState(new Date().getMonth() + 1);
  const [filter, setFilter] = useState({
    _offset: 0,
    _limit: limit,
    _time: currentMonth,
  });
  const fetchData = async (
    params = { _offset: 0, _limit: limit, _time: currentMonth }
  ) => {
    try {
      const response = await getAllReviews(params);
      setReviews(response);
      setFilter(params);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleChangePage = (e) => {
    setPage(e);
    fetchData({ _offset: limit * (e - 1), _limit: limit });
  };
  const handleChangeSelectMonth = (e) => {
    fetchData({ _offset: 0, _limit: limit, _time: e });
    handlePercent(e, e - 1);
    setMonth(e);
  };
  const handlePercent = async (
    current = currentMonth,
    prev = currentMonth - 1
  ) => {
    const countReviews = await getAllReviews({ _time: current });
    const countPrevReviews = await getAllReviews({ _time: prev });
    if (countPrevReviews?.total == 0) {
      setPercent(countReviews?.total == 0 ? 0 : 100);
    } else {
      setPercent(
        ((countReviews?.total - countPrevReviews?.total) /
          countPrevReviews?.total) *
          100
      );
    }
  };
  const handleDeleteReview = async (id) => {
    const res = await deleteReview(id);
    if (res) {
      message.open({ type: "success", content: res });
      fetchData(filter);
    }
  };
  useEffect(() => {
    fetchData();
    handlePercent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fetchDataColumn = async () => {
      const res = await getAllReviews({
        _time: currentMonth,
        _group: "createdAt",
      });
      const arr = new Array(getDaysInMonth(2023, currentMonth)).fill(0);
      res?.total?.forEach((el) => {
        arr[+formatNgay(el.createdAt).substring(0, 2) - 1] += el.count;
      });
      setDataChart(arr);
    };
    fetchDataColumn();
  }, [currentMonth]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="my-7 px-5">
      <div className="p-5 mb-6 rounded-md border border-solid border-gray-300">
        <Row align={"middle"} justify={"center"}>
          <Col sm={24} md={8}>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              Phản hồi từ khách hàng
            </h3>
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
            <span className="text-3xl font-bold text-gray-700">
              {reviews?.total}
            </span>
            <span className="mx-3">lượt đánh giá</span>
            <span
              style={percent >= 0 ? { color: "#22C55E" } : { color: "#EF4444" }}
              className="font-bold text-xl inline-flex items-center gap-x-1.5 my-3"
            >
              {percent >= 0 ? (
                <>
                  {percent}%
                  <UpCircleFilled
                    className="text-2xl"
                    style={{ color: "#22C55E" }}
                  />
                </>
              ) : (
                <>
                  {percent}%
                  <DownCircleFilled
                    className="text-2xl"
                    style={{ color: "#EF4444" }}
                  />
                </>
              )}
            </span>
            <span> so với tháng trước</span>
          </Col>
          <Col sm={24} md={16}>
            <ColumnChart
              series={[
                {
                  name: "Tích cực",
                  data: dataChart,
                },
              ]}
              colors={percent >= 0 ? ["#22C55E"] : ["#EF4444"]}
              categories={getDaysInMonth(2023, currentMonth)}
            />
          </Col>
        </Row>
      </div>
      <div className="mb-6 p-5 rounded-md border border-solid border-gray-300">
        <h3 className="text-lg lg:text-2xl font-bold text-gray-700 mb-3">
          Đánh giá gần đây
        </h3>
        <SearchComponent className="max-w-md" />
        <Row gutter={[20, 20]} className="my-6">
          {reviews?.data?.map((el, index) => {
            return (
              <Col key={index} xs={24} sm={12} lg={8}>
                <div className="p-8 rounded-md border border-solid border-gray-300">
                  <Row gutter={[20, 20]} justify="space-between">
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
                          <h4 className="lg:text-xl text-gray-700 font-semibold">
                            {el.name}
                          </h4>
                          <p className="text-gray-500 my-2">
                            {formatNgay(el.createdAt, "HH:mm DD-MM-YYYY")}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs="12">
                      <ButtonComponents
                        className="text-white bg-secondaryColor border-none"
                        content={"Xóa"}
                        onClick={() => handleDeleteReview(el.id)}
                      />
                    </Col>
                  </Row>
                  <div className="my-3 text-center">
                    <Rate
                      tooltips={desc}
                      className="text-main"
                      value={el.rate}
                    />
                    {el.rate ? (
                      <span className="ant-rate-text text-main capitalize">
                        {desc[el.rate - 1]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-gray-500 h-16">{el.description}</p>
                  <p className="text-gray-500 my-3 font-semibold">
                    {formatNgay(el["order.createdAt"])}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
        <div className="text-center">
          <Pagination
            defaultCurrent={page}
            onChange={handleChangePage}
            total={50}
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
