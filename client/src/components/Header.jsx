import React, { useState } from "react";
import panda from "../assets/images/panda.png";

const Header = () => {
  const [user, setUser] = useState(true);

  return (
    <div
      className={`h-24 md:h-20 lg:hidden bg-primary rounded-b-3xl drop-shadow-md px-6 text-white flex items-center ${user ? 'justify-between' : 'justify-center'}`}
    >
      {user ? (
        <>
          <div className="flex flex-col">
            <span className="text-white text-lg">
              Xin chào, <span className="font-medium">Phú</span>
            </span>
            <span className="text-base text-[#FFE6C7]">
              Bạn đang ngồi bàn số 1
            </span>
          </div>
          <div className="w-12 h-12 border-2 rounded-full border-white">
            <img className="w-full h-full" src={panda} alt="" />
          </div>
        </>
      ) : (
        <>
          <span className="font-bold text-base lg:text-xl">Vui lòng quét mã để đặt món</span>
        </>
      )}
    </div>
  );
};

export default Header;
