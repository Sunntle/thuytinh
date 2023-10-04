import React, {useEffect, useState} from "react";
import panda from "../assets/images/panda.png";
import {useSelector} from "react-redux";
import useHttp from "../hooks/useHttp.js";

const Header = () => {
  const customerName = useSelector((state) => state.customerName);
  const idTable = location.pathname.split("/")[1].split("-")[1];
  const [table, setTable] = useState(null)
  const {sendRequest } = useHttp();

  useEffect(() => {
    const request = {
      method: 'get',
      url:`table/${idTable}`
    }
    sendRequest(request, setTable)
  }, [sendRequest, idTable]);

  console.log(table)

  return (
    <div
      className={`w-full h-20 z-40 relative lg:hidden bg-primary rounded-b-3xl drop-shadow-md px-6 text-white flex items-center ${
          customerName ? "justify-between" : "justify-center"
      }`}
    >
      {customerName ? (
        <>
          <div className="flex flex-col">
            <span className="text-white text-lg">
              Xin chào, <span className="font-medium">{ customerName }</span>
            </span>
            <span className="text-base text-[#FFE6C7]">
              Bạn đang ngồi {table?.name_table}
            </span>
          </div>
          <div className="w-12 h-12 border-2 rounded-full border-white">
            <img className="w-full h-full" src={panda} alt="" />
          </div>
        </>
      ) : (
        <>
          <span className="font-bold text-base lg:text-xl">
            Vui lòng quét mã để đặt món
          </span>
        </>
      )}
    </div>
  );
};

export default Header;
