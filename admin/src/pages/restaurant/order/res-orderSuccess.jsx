import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { formatGia } from "../../../utils/format";
import { RemoveTableList } from "../../../redux/table/listTableSystem";
import { getOrderByID } from "../../../services/api";
const today = new Date();
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const resCa = await getOrderByID(id);
      setOrder(resCa);
    };
    fetchData();
  }, [id]);
  
  const columns = [
    {
      title: "Tên món ăn",
      dataIndex: "product.name_product",
      key: "name",
      render: (_, record) => <span>{record?.Product?.name_product}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "product.price",
      key: "price",
      render: (_, record) => <span>{formatGia(record?.Product?.price)}</span>,
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <span>{formatGia(record?.Product?.price * record?.quantity)}</span>
      ),
    },
  ];
  const backHome = () => {
    dispatch(RemoveTableList());
    navigate("/employee/choosetable");
  };
  return (
    <div className="lg:p-10 min-h-screen max-w-full ">
      <div className="relative h-screen w-screen max-w-full mx-auto">
        {/* Invoice Text*/}
        <div className="flex items-center justify-start mt-6 gap-x-3">
          <div className="relative bg-main h-6 lg:h-8 w-full"></div>
          <span className="block whitespace-nowrap uppercase text-2xl lg:text-4xl font-medium">
            Hóa đơn
          </span>
          <div className="relative bg-main h-6 lg:h-8 w-4/12"></div>
        </div>
        {/*Information Invoice*/}
        <div className="max-w-full flex items-center justify-between px-4 mt-14 text-sm md:text-base ">
          {/**/}
          <div className="flex flex-col items-start justify-start font-medium space-y-2">
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Tên khách hàng:</span>
              <span className="block font-semibold text-main">
                {order?.data?.name}
              </span>
            </div>
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Phương thức:</span>
              <span className="whitespace-nowrap font-semibold text-main">
                Cash
              </span>
            </div>
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Số bàn:</span>
              <span className="whitespace-nowrap font-semibold text-main">
                {order?.data?.tablebyorders?.[0]?.tableId}
              </span>
            </div>
          </div>
          {/**/}
          <div className="flex flex-col items-end justify-start font-medium space-y-2">
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Hóa đơn số:</span>
              <span className="block font-semibold text-main">
                {order?.data?.id}
              </span>
            </div>
            <div className="flex justify-between items-center space-x-1 w-full">
              <span className="whitespace-nowrap">Ngày:</span>
              <span className="whitespace-nowrap font-semibold text-main">
                {moment(today, "YYYYMMDDHHmmss").format("DD-MM-YYYY")}
              </span>
            </div>
          </div>
        </div>
        {/*Order*/}
        <div className="w-full px-4 mt-5">
          <Table
            columns={columns}
            pagination={false}
            dataSource={order?.data?.order_details}
            rowKey={(data) => data.id}
          />
        </div>
        {/*  */}
        <div className="w-full px-4 mt-4 flex justify-end items-start text-sm md:text-base font-semibold">
          <div className="min-w-0 flex flex-col justify-start items-end space-y-3">
            <div className="flex justify-between items-center w-full space-x-5">
              <span className="whitespace-nowrap">Tạm tính:</span>
              <span className="block font-semibold text-main">
                {formatGia(order?.data?.total || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center w-full space-x-5">
              <span className="whitespace-nowrap">VAT:</span>
              <span className="block font-semibold text-main">10%</span>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 flex justify-end items-center text-base md:text-xl font-semibold text-white">
          <div className="min-w-0 flex flex-col justify-start items-end bg-main">
            <div className="flex justify-between items-center w-full space-x-5 py-1 px-3">
              <span className="whitespace-nowrap">Tổng cộng:</span>
              <span className="block font-semibold">
                {formatGia(order?.data?.total || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
