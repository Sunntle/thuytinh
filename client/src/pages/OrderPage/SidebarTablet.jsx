import React from "react";
import { HiXMark } from "react-icons/hi2";
import SubMenu from "./SubMenu.jsx";

const SidebarTablet = () => {
  const subMenuList = [
    {
      name: "Món ăn chính",
      menus: ["Nướng", "Lẩu", "Hấp", "Xào"],
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
