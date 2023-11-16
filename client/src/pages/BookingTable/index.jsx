import { DatePicker, Form, Select, TimePicker } from "antd";
import moment from "moment";
import "./index.css";
import { useState } from "react";
import useHttp from "../../hooks/useHttp.js";
import { useNavigate } from "react-router-dom";
import { parseQueryString } from "../../utils/format.js";

const disabledDate = (cur) => {
  return cur && cur < moment().subtract(1, "day").endOf("day");
};

const positions = [
  {
    label: "Trong nhà",
    value: "in",
  },
  {
    label: "Ngoài trời",
    value: "out",
  },
];
const party_sizes = [
  {
    label: "2 người",
    value: "2",
  },
  {
    label: "3 người",
    value: "3",
  },
  {
    label: "4 người",
    value: "4",
  },
  {
    label: "5 người",
    value: "5",
  },
  {
    label: "6 người",
    value: "6",
  },
];
const BookingTable = () => {
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);
  const [tables, setTables] = useState([]);
  const watchedDate = Form.useWatch("date", form);
  const watchedTime = Form.useWatch("time", form);

  const disabledTime = () => {
    return {
      disabledHours: () => {
        const hours = [];
        if (watchedDate > moment().date()) {
          return hours;
        }
        const currentHour = moment().hour();
        for (let i = 0; i < currentHour; i++) {
          hours.push(i);
        }
        return hours;
      },
      disabledMinutes: () => {
        const minutes = [];
        const currentMinute = moment().minute();
        const currentHour = moment().hour();

        if (
          watchedDate > moment().date() ||
          currentMinute > 45 ||
          watchedTime?.["$H"] > currentHour
        ) {
          return minutes;
        }

        for (let i = 0; i < currentMinute; i += 15) {
          minutes.push(i);
        }
        return minutes;
      },
    };
  };

  const fetchTable = async ({ position, createdAt, party_size }) => {
    console.log(position, createdAt, party_size);
    const request = {
      method: "get",
      url: `/table/check-booking?position=${position}&createdAt=${createdAt}&party_size=${party_size}`,
    };
    await sendRequest(request, setTables, false);
  };

  const onSubmitFetchTable = async (values) => {
    let date = moment(values.date).format("DD/MM/YYYY");
    let time = moment(values.time["$d"]).format("HH:mm");
    const createdAt = moment(date + time, "DD/MM/YYYY HH:mm").format(
      "DD/MM/YYYY HH:mm:ss",
    );
    values = {
      party_size: values.party_size,
      position: values.position,
      createdAt,
    };
    await fetchTable(values);
    setResult(`?${new URLSearchParams(values).toString()}`);
  };
  const onSubmitPendingTable = async (tableId) => {
    const { party_size, createdAt } = parseQueryString(result);
    const momentOne = moment(createdAt, "DD/MM/YYYY HH:mm").toISOString();
    console.log(momentOne);
    const body = {
      party_size: party_size,
      tableId: tableId,
      createdAt: momentOne,
    };
    const request = {
      method: "post",
      url: "/table/pending-booking",
      ...body,
    };
    const dataResponse = await sendRequest(request, undefined, true);
    // console.log(data)
    if (!dataResponse.success) {
      console.log(dataResponse.message);
    } else {
      navigate(`/booked${result}&tables=${tableId}`, {
        state: { id: dataResponse.data.id },
      });
    }
  };

  return (
    <div className="tracking-wide space-y-10 pt-32 max-w-full w-screen min-h-screen bg-[url('https://images.unsplash.com/photo-1699148689335-16a572d22c22?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center">
      <div className="mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 min-h-fit bg-white rounded-lg">
        <Form
          form={form}
          onFinish={onSubmitFetchTable}
          className="md:pt-0 overflow-hidden w-full min-h-fit grid grid-rows-3 grid-cols-2 md:grid-rows-none md:grid-cols-9 place-items-center md:gap-4"
        >
          <div className="p-4 w-full col-span-1 md:col-span-2 flex flex-col place-self-center">
            <span className="ml-3 text-xs text-slate-500">Vị trí</span>
            <Form.Item
              name="position"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
            >
              <Select
                placeholder="Chọn vị trí"
                className="w-full"
                bordered={false}
                size={"middle"}
                options={positions}
              />
            </Form.Item>
          </div>

          <div className="p-4 w-full col-span-1 md:col-span-2 flex flex-col place-self-center">
            <span className="ml-3 text-xs text-slate-500">Số lượng</span>
            <Form.Item
              name="party_size"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
            >
              <Select
                placeholder="Chọn số lượng"
                className="w-full"
                bordered={false}
                size={"middle"}
                options={party_sizes}
              />
            </Form.Item>
          </div>

          <div className="p-4 w-full md:col-span-2 flex flex-col place-self-center">
            <span className="ml-3 text-xs text-slate-500">Ngày</span>
            <Form.Item
              name="date"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
            >
              <DatePicker
                placeholder="Chọn ngày"
                bordered={false}
                className="w-full"
                disabledDate={disabledDate}
                format={"DD/MM/YYYY"}
                size={"middle"}
              />
            </Form.Item>
          </div>

          <div className="p-4 w-full md:col-span-2 flex flex-col place-self-center">
            <span className="ml-3 text-xs text-slate-500">Giờ</span>
            <Form.Item
              name="time"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
            >
              <TimePicker
                className="w-full focus:border-primary"
                placeholder="Chọn giờ"
                // defaultValue={moment().format("HH:mm")}
                disabledTime={disabledTime}
                bordered={false}
                minuteStep={15}
                size={"middle"}
                format={"HH:mm"}
              />
            </Form.Item>
          </div>

          <div className="w-full h-full tracking-wide col-span-2 md:col-span-1 pt-6 md:pt-0">
            <button
              type={"submit"}
              className="md:p-6 md:flex justify-center items-center whitespace-nowrap w-full h-full tracking-wide bg-primary rounded-b-lg md:rounded-bl-none md:rounded-br-lg md:rounded-r-lg md:text-sm text-white font-medium"
            >
              Tìm kiếm
            </button>
          </div>
        </Form>
      </div>

      {tables?.time && (
        <div className="text-center text-white">{tables.message}</div>
      )}
      <div className="space-y-3">
        {tables?.data?.length &&
          tables?.data?.map((table) => (
            <div
              key={table.id}
              className="mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 min-h-fit bg-white rounded py-1 px-2"
            >
              <div key={table.id} className="flex justify-between items-center">
                <span>{table.name_table}</span>
                <span
                  className="cursor-pointer bg-primary py-2 px-3 rounded text-white"
                  onClick={() => onSubmitPendingTable(table.id)}
                >
                  {moment(tables.time).format("HH:mm")}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default BookingTable;
