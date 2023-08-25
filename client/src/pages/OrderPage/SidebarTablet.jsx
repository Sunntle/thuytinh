import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import SubMenu from "./SubMenu.jsx";
import useHttp from "../../hooks/useHttp.js";

const SidebarTablet = () => {
  const { sendRequest, isLoading, error } = useHttp();
  const [data, setData] = useState(null);
  const menus = [];

  useEffect(() => {
    const request = {
      method: "get",
      url: "category",
    };
    sendRequest(request, setData);
  }, [sendRequest]);

  if (data !== null) {
    data.map((cate) => menus.push({ _id: cate.id, name: cate.name_category }));
  }

  const subMenuList = [
    {
      name: "Món ăn chính",
      menus: menus
    },
    {
      name: "Món ăn kèm",
      menus: ["Rau", "Thịt"],
    },
  ];

  return (
    <div className="bg-white w-full h-screen z-40 p-3 drop-shadow-2xl">
      <div className="relative h-full w-full">
        {/*Logo and Close*/}
        <div className="flex justify-between items-center mb-5">
          <div className="w-16 h-16 rounded-full border p-2">
            <img
              src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
        {/* List */}
        {subMenuList?.map((data, index) => (
          <SubMenu key={index} index={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default SidebarTablet;
