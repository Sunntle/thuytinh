import React, { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { motion } from "framer-motion";

const SubMenu = ({ data, index }) => {
  const [activeKey, setActiveKey] = useState(null);

  const initialMotion = {
    open: {
      x: 0,
      height: "auto",
      transition: {
        easeInOut: 1,
      },
    },
    closed: {
      x: -450,
      height: 0,
      transition: {
        easeInOut: 1,
      },
    },
  };

  return (
    <div className="flex flex-col space-y-3 w-full px-1 mb-5">
      {/* Menu */}
      <div>
        <div
          onTouchStart={() => setActiveKey(activeKey === index ? null : index)}
          className={`px-3 py-3 mb-3 flex justify-between items-center rounded-lg ${
            activeKey === index
              ? "bg-primary bg-opacity-[15%] text-primary"
              : ""
          }`}
        >
          <span className="text-2xl font-medium">{data.name}</span>
          <HiChevronRight className={`w-6 h-6 transition-transform transform duration-300 ${activeKey === index ? 'rotate-90' : ''}`} />
        </div>
        {/* Submenu */}
        <motion.div
          variants={initialMotion}
          initial={{x: -450}}
          animate={activeKey === index ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-5 ml-10">
            {data?.menus?.map((menu, index) => (
              <div key={index} className="relative">
                <span className="text-xl font-medium after:absolute after:-bottom-1 after:left-0 after:w-full after:border-b active:text-primary active:after:border-primary">
                  {menu}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubMenu;
