import { HiOutlineBellAlert } from "react-icons/hi2";
import { socket } from "../../services/socket.js";
import { useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const CallStaff = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { tables } = useSelector((state) => state.customerName);

  const handleCallStaff = async () => {
    if (isDisabled) return;
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);

    try {
      socket.emit("call-staff", tables[0]);
      await messageApi.open({
        type: "success",
        content: "Gọi nhân viên thành công",
      });
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Lỗi hệ thống",
      });
      console.log(err);
    }
  };

  return (
    <>
      {contextHolder}
      <button
        disabled={isDisabled}
        onClick={handleCallStaff}
        className={`${
          isDisabled ? "hidden" : "bg-white"
        } cursor-pointer fixed p-2 right-5 lg:right-20 bottom-24 w-auto h-auto border-2 active:bg-primary active:text-white transition-all border-primary rounded-full flex justify-center items-center z-40`}
      >
        <span
          className={`absolute inline-flex h-10 w-10 rounded-full bg-primary opacity-30 animate-ping`}
        ></span>
        <HiOutlineBellAlert
          className={`w-6 h-6 lg:w-8 lg:h-8 text-primary animate-swing`}
        />
      </button>
    </>
  );
};

export default CallStaff;
