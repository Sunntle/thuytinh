import { DatePicker, Form, Select, TimePicker, Typography } from "antd";
import moment from "moment";
import "./index.css";
import { useState } from "react";
import useHttp from "../../hooks/useHttp.js";
import { useNavigate } from "react-router-dom";
import { parseQueryString } from "../../utils/format.js";

const disabledTime = () => {
  return {
    disabledHours: () => {
      const hours = [];
      const currentHour = moment().hour();

      for (let i = 0; i < currentHour; i++) {
        hours.push(i);
      }
      return hours;
    },
    disabledMinutes: () => {
      const minutes = [];
      const currentMinutes = moment().minute();

      for (let i = 0; i < currentMinutes; i += 15) {
        minutes.push(i);
      }
      return minutes;
    },
  };
};

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
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  const fetchTable = async ({ position, createdAt, party_size }) => {
    console.log(position, createdAt, party_size)
    const request = {
      method: "get",
      url: `/table/check-booking?position=${position}&createdAt=${createdAt}&party_size=${party_size}`,
    };
    await sendRequest(request, setTables, false);
  };

  const onSubmitFetchTable = async (values) => {
    let date = moment(values.date).format("DD/MM/YYYY");
    let time = moment(values.time["$d"]).format("HH:mm");
    const createdAt = moment(date + time, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm:ss")
    values = { party_size: values.party_size, position: values.position, createdAt };
    await fetchTable(values);
    setResult(`?${new URLSearchParams(values).toString()}`);
  };

//   const onSubmitFetchTable = async (values) => {
//     values = {
//       ...values,
//       date: moment(values.date).format("DD/MM/YYYY"),
//       time: moment(values.time["$d"]).format("HH:mm"),
//     };
//     await fetchTable(values.position);
//     setResult(`?${new URLSearchParams(values).toString()}`);
//   };
          <div className=" w-full col-span-1 md:col-span-2 flex flex-col place-self-center">
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

//           <div className=" w-full col-span-1 md:col-span-2 flex flex-col place-self-center">
//             <span className="ml-3 text-xs text-slate-500">Số lượng</span>
//             <Form.Item
//               name="adult"
//               rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
//             >
//               <Select
//                 placeholder="Chọn số lượng"
//                 className="w-full"
//                 bordered={false}
//                 size={"middle"}
//                 options={adults}
//               />
//             </Form.Item>
//           </div>

          <div className=" w-full md:col-span-2 flex flex-col place-self-center">
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
              // onChange={(e, formatTime) =>
              //   setInfor({ ...infor, time: formatTime })
              // }
              />
            </Form.Item>
          </div>

          <div className="w-full h-full tracking-wide col-span-2 md:col-span-1 pt-6 md:pt-0">
            <button
              type={"submit"}
              // onClick={fetchTable}
              className="md:p-6 md:flex justify-center items-center whitespace-nowrap w-full h-full tracking-wide bg-primary rounded-b-lg md:rounded-bl-none md:rounded-br-lg md:rounded-r-lg md:text-sm text-white font-medium"
            >
              Tìm kiếm
            </button>
          </div>
        </Form>
      </div>
      {tables?.time && <div className="text-center text-white">
        {tables.message}
      </div>}
      <div className="space-y-3">
        {tables?.data?.length &&
          tables?.data?.map((table) => (
            <div key={table.id} className="mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 min-h-fit bg-white rounded py-1 px-2">
              <div key={table.id} className="flex justify-between items-center">
                <span>{table.name_table}</span>
                <span
                  className="cursor-pointer bg-primary py-2 px-3 rounded text-white"
                  onClick={() => navigate(`/booked${result}&tables=${table.id}`)}
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

//           <div className="w-full h-full tracking-wide col-span-2 md:col-span-1 pt-6 md:pt-0">
//             <button
//               type={"submit"}
//               // onClick={fetchTable}
//               className="md:p-6 md:flex justify-center items-center whitespace-nowrap w-full h-full tracking-wide bg-primary rounded-b-lg md:rounded-bl-none md:rounded-br-lg md:rounded-r-lg md:text-sm text-white font-medium"
//             >
//               Tìm kiếm
//             </button>
//           </div>
//         </Form>
//       </div>
//       <div className="space-y-3">
//         {tables !== null &&
//             tables.map((table) => (
//                 <div key={table.id} className="mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 min-h-fit bg-white rounded py-1 px-2">
//                   <div key={table.id} className="flex justify-between items-center">
//                     <span>{table.name_table}</span>
//                     <span
//                         className="cursor-pointer bg-primary py-2 px-3 rounded text-white"
//                         onClick={() => navigate(`/booked${result}&tables=2`)}
//                     >
//                 {parseQueryString(result).time}
//               </span>
//                   </div>
//                 </div>
//             ))}
//       </div>
//     </div>
//   );
// };
const BookingTable = () =>{
  return <Typography.Title level={3} style={{marginTop: "100px", textAlign: "center"}}>Tính năng đang phát triển ....</Typography.Title>
}
export default BookingTable;
