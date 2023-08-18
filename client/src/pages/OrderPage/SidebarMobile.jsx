import React from "react";
import { HiXMark } from "react-icons/hi2";
import { motion } from "framer-motion";
import SubMenu from "./SubMenu.jsx";

const SidebarMobile = ({ isSidebarOpen, setIsSidebarOpen }) => {
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

    const sidebarAnimation = {
        open: {
            x: 0,
            width: '75%',
            transition: {
                damping: 40,
            },
        },
        closed: {
            x: -250,
            width: 0,
            transition: {
                damping: 40,
            },
        },
    };

    return (
        <motion.div
            variants={sidebarAnimation}
            animate={isSidebarOpen ? "open" : "closed"}
            className="bg-white fixed top-0 w-9/12 h-full z-40 p-3 drop-shadow-2xl"
        >
            <div className="relative h-full w-full">
                {/*Logo and Close*/}
                <div className="flex justify-between items-center">
                    <div className="w-16 h-16 rounded-full border p-2">
                        <img
                            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute right-0"
                    >
                        <HiXMark className="w-8 h-8" />
                    </button>
                </div>
                {/* List */}
                {subMenuList?.map((data, index) => (
                    <SubMenu key={index} data={data} />
                ))}
            </div>
        </motion.div>
    );
};

export default SidebarMobile;