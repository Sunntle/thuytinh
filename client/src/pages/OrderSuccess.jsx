import React from 'react';
import {BsCheck2Circle} from "react-icons/bs";
import ButtonComponent from "../components/ButtonComponent.jsx";
import {motion} from "framer-motion";

const OrderSuccess = () => {

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            className="h-screen w-screen flex items-center justify-center text-slate-800">
            <div className="w-6/12 flex flex-col items-center rounded-lg space-y-5 drop-shadow-md">
                <span className="font-medium text-lg md:text-3xl">Đặt món thành công</span>
                <BsCheck2Circle className="w-8 h-8 text-green-500" />
                <ButtonComponent className="w-10/12 sm:w-9/12 xl:w-5/12 p-2 rounded-lg" type={'primary'} size={'md'} children={'Quay về trang chủ'}/>
            </div>
        </motion.div>
    );
};

export default OrderSuccess;