import moment from "moment";
import { Form, Input, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp.js";
import { useLocation, useNavigate } from "react-router-dom";
import { parseQueryString, ScrollToTop } from "../../utils/format.js";
import { regexEmail, regexPhone } from "../../utils/regex.js";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { Spinner } from "../../components/index.js";
import { Helmet } from "react-helmet";
import Image from "../../components/Image/Image.jsx";

const Booked = () => {
  const { sendRequest, isLoading } = useHttp();
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);
  const [idTableByOrder, setIdTableByOrder] = useState(null);
  const location = useLocation();
  // const { id: idTableByOrder } = location.state;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const parsedQueryParams = parseQueryString(location.search);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (location.state === null) {
      navigate("/reservation");
    } else {
      setIdTableByOrder(location.state.id);
    }
  }, [location.state, navigate]);

  const chooseAnotherTable = useCallback(
    async (id) => {
      const request = {
        method: "delete",
        url: `/table/booking/${id}`,
      };
      await sendRequest(request, undefined, true);
      navigate("/reservation");
    },
    [navigate, sendRequest],
  );

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1; // Giảm thời gian còn lại mỗi giây nếu vẫn còn thời gian
        }
        return 0; // Nếu hết thời gian, dừng đếm ngược
      });
    }, 1000);

    if (timeLeft === 0) {
      chooseAnotherTable(idTableByOrder);
    }

    return () => clearInterval(countdown);
  }, [chooseAnotherTable, idTableByOrder, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const submitBookingTable = async (information) => {
    const body = {
      ...information,
      id: idTableByOrder,
    };
    const request = {
      method: "post",
      url: "/table/booking",
      ...body,
    };
    const bookingSuccessData = await sendRequest(request, undefined, true);
    if (bookingSuccessData) {
      setIsReservationConfirmed(true);
    }
  };

  if (isLoading)
    return (
      <>
        <Spinner />
        <ScrollToTop />
      </>
    );

  return (
    <div className="py-24 text-slate-500 tracking-wide max-w-full w-screen min-h-screen bg-[url('https://res.cloudinary.com/dw6jih4yt/image/upload/v1700287118/NhaHangThuyTinh/bxjvz96etxtbyzsiz1ty.webp')] bg-no-repeat bg-cover bg-center">
      <ScrollToTop />

      <Helmet>
        <title>Xác nhận thông tin</title>
        <meta name="booked" content="booked" />
      </Helmet>

      <div className="mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 min-h-fit bg-white rounded p-4">
        <span className="block text-center text-xl font-medium text-primary uppercase">
          Xin vui lòng kiểm tra thông tin
        </span>
        <span className="block text-center">
          Thời gian đặt bàn: {formatTime(timeLeft)}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base mt-8">
          <div className="flex justify-between items-center border-b pb-1">
            <span>Số bàn: </span>
            <span>{parsedQueryParams?.tables || 0}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-1">
            <span>Vị trí: </span>
            <span>
              {parsedQueryParams?.position === "in"
                ? "Trong nhà"
                : "Ngoài trời"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-1">
            <span>Số người: </span>
            <span>{parsedQueryParams?.party_size || 0}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-1">
            <span>Thời gian: </span>
            <span>
              {parsedQueryParams?.createdAt !== undefined
                ? moment(
                    parsedQueryParams?.createdAt,
                    "DD/MM/YYYY HH:mm",
                  ).format("DD/MM/YYYY HH:mm ")
                : ""}
            </span>
          </div>
        </div>
        <Form
          form={form}
          onFinish={submitBookingTable}
          className="grid grid-cols-1 gap-4 mt-12"
        >
          <div className="w-full flex flex-col">
            <label htmlFor="name">Họ tên</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
                {
                  max: 50,
                  message: "Vui lòng nhập không quá 50 kí tự",
                },
              ]}
              name="name"
            >
              <Input
                id="name"
                className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
              />
            </Form.Item>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="email">Email</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
                {
                  pattern: regexEmail,
                  message: "Vui lòng nhập đúng định dạng email",
                },
              ]}
              name="email"
            >
              <Input
                id="email"
                className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
              />
            </Form.Item>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="phone">Số điện thoại</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
                {
                  max: 10,
                  message: "Vui lòng nhập đúng 10 số",
                },
                {
                  pattern: regexPhone,
                  message: "Số điện thoại không tồn tại",
                },
                {
                  min: 10,
                  message: "Vui lòng nhập đúng 10 số",
                },
              ]}
              name="phone"
            >
              <Input
                id="phone"
                className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
              />
            </Form.Item>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="phone">Đề xuất với nhà hàng (không bắt buộc)</label>
            <Form.Item name="note">
              <Input.TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                id="note"
                className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
              />
            </Form.Item>
          </div>
          <div className="w-full h-full tracking-wide">
            <button
              type={"submit"}
              className="flex justify-center items-center whitespace-nowrap w-full h-full tracking-wide bg-primary rounded py-2 md:text-sm text-white font-medium"
            >
              Đặt bàn
            </button>
          </div>
          <span
            onClick={() => chooseAnotherTable(idTableByOrder)}
            className="cursor-pointer text-center block text-sm text-slate-500 hover:text-primary transition-colors duration-200"
          >
            Chọn bàn khác
          </span>
        </Form>
      </div>
      {isReservationConfirmed && (
        <Modal
          open={isReservationConfirmed}
          closable={false}
          footer={false}
          centered={true}
        >
          <div className="w-full flex flex-col justify-stretch items-center space-y-3">
            <Image
              src="https://res.cloudinary.com/dw6jih4yt/image/upload/w_400,h_300/v1700285718/NhaHangThuyTinh/vs5y5bjdebolhbjgg3f0.webp"
              alt="Ảnh"
            />
            <p className="block text-lg text-primary font-medium text-center">
              Xin cảm ơn quý khách đã đặt bàn <br />{" "}
              <span className="text-sm">
                Mong quý khách đến đúng giờ đã đặt!
              </span>
            </p>
            <button
              onClick={() => navigate("/home")}
              className="w-full bg-primary py-2 text-white space-x-1 rounded flex justify-center items-center"
            >
              <span>Quay về trang chủ</span>
              <MdSubdirectoryArrowLeft size={16} />
            </button>
          </div>
        </Modal>
      )}
      {location.search === "" && (
        <Modal open={false} closable={false} footer={false} centered={true}>
          <div className="w-full flex flex-col justify-stretch items-center space-y-3">
            <p className="block text-base font-medium">
              Vui lòng chọn bàn trước
            </p>
            <button
              onClick={() => navigate("/reservation")}
              className="w-full bg-primary py-2 text-white space-x-1 rounded flex justify-center items-center"
            >
              <span>Quay về trang đặt bàn</span>
              <MdSubdirectoryArrowLeft size={16} />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Booked;
