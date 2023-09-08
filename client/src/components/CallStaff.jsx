import React from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";

const CallStaff = () => {
    return (
        <div className="fixed p-2 right-5 lg:right-20 bottom-24 w-auto h-auto bg-white border-2 active:bg-primary transition-all border-primary rounded-full flex justify-center items-center">
            <HiOutlineBellAlert className="w-6 h-6 lg:w-8 lg:h-8 text-primary animate-swing active:text-white" />
        </div>
    );
};

export default CallStaff;
