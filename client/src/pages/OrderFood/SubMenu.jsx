import React from "react";
import { HiChevronRight } from "react-icons/hi2";

const SubMenu = ({ data }) => {
  return (
    <div className="flex flex-col space-y-5 w-full px-1 mt-10">
      {/* Menu */}
      <div>
        <div className="px-3 py-3 flex justify-between items-center bg-primary bg-opacity-[15%] text-primary rounded-lg">
          <span className="text-2xl font-medium">{data.name}</span>
          <HiChevronRight className="w-6 h-6" />
        </div>
        {/* Submenu */}
        <div className="flex flex-col space-y-5 ml-10 mt-3 ">
          {data?.menus?.map((menu,index) => (
            <div key={index} className="relative">
              <span className="text-xl font-medium after:absolute after:-bottom-1 after:left-0 after:w-full after:border-b active:text-primary active:after:border-primary">
                {menu}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
