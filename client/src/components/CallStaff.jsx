import React from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";

const CallStaff = () => {
    return (
        <div className="fixed p-2 right-5 lg:right-20 bottom-24 w-auto h-auto bg-white border-2 active:bg-primary transition-all border-primary rounded-full flex justify-center items-center ">
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-primary opacity-30"></span>
            <HiOutlineBellAlert className="w-6 h-6 lg:w-8 lg:h-8 text-primary animate-swing active:text-white" />
        </div>
    );
};

export default CallStaff;
