import useHttp from "../../hooks/useHttp.js";
import { Form, Input, Modal, notification } from "antd";
import { regexEmail, regexPhone } from "../../utils/regex.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCustomerName } from "../../redux/CustomerName/customerNameSlice.js";
const ActiveBooking = () => {
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableActive, setTableActive] = useState(null);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, res) => {
    api[type]({
      message: 'Thông báo',
      description: res
    });
  };
  const onSubmitFindTable = async (values) => {
    const request = {
      method: "get",
      url: `/table/booking?phone=${values.phone}&name=${values.name}&email=${values.email}&tableId=${values.table_id}`,
    };
    const data = await sendRequest(request, undefined, true);
    console.log(data)
    if (data === undefined) {
      alert("Không có dữ liệu");
    } else {
      setTableActive(data[0]);
    }
  };

  const onClickActiveBooking = async () => {

    const body = {
      tableId: tableActive?.tableId,
      orderId: tableActive?.orderId
    }
    const request = {
      method: "post",
      url: "/table/active-booking",
      ...body
    };
    const { success, message, data, token } = await sendRequest(request, undefined, true);
    openNotificationWithIcon(success ? "success" : "info", message);
    if (token) {
      localStorage.setItem("tableToken", token)
      dispatch(getCustomerName(data))
      navigate(`/tables-${data.tables[0]}`);
    }

  }

  return (
    <div className="py-24 text-slate-500 tracking-wide max-w-full w-screen min-h-screen bg-[url('https://images.unsplash.com/photo-1699148689335-16a572d22c22?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center">
      {contextHolder}
      <div className="mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 min-h-fit bg-white rounded p-4">
        <span className="block text-center text-xl font-medium text-primary uppercase">
          Kích hoạt bàn
        </span>
        <Form
          form={form}
          onFinish={onSubmitFindTable}
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
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng email",
                }
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
            <label htmlFor="phone">Mã bàn</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
              ]}
              name="table_id"
            >
              <Input
                id="table_id"
                className="mt-1 text-sm py-2 pl-1 rounded shadow-sm border focus:border-primary hover:border-primary focus:ring-2 focus:ring-primary/80 ring-offset-2 outline-none transition-all duration-200"
              />
            </Form.Item>
          </div>
          <div className="w-full h-full tracking-wide">
            <button
              type={"submit"}
              className="flex justify-center items-center whitespace-nowrap w-full h-full tracking-wide bg-primary rounded py-2 md:text-sm text-white font-medium"
            >
              Tìm kiếm
            </button>
          </div>
        </Form>
      </div>
      <Modal open={!!tableActive} closable={false} footer={false} centered={true}>
        <div className="w-full flex flex-col justify-stretch items-center space-y-3">
          <button
            onClick={() => onClickActiveBooking()}
            className="w-full bg-primary py-2 text-white space-x-1 rounded flex justify-center items-center"
          >
            <span>Nhấn vào đây để kích hoạt bàn</span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ActiveBooking;
