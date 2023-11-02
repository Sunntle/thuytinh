import React from "react";
import { Spin } from "antd";

const Spinner = ({ className }) => {
  return (
    <div
      className={`relative h-screen w-full flex flex-col justify-center items-center ${className}`}
    >
      <Spin size={"large"} />
      <span className="mt-5 text-base font-semibold">
        Quý khách vui lòng đợi trong giây lát.
      </span>
    </div>
  );
};

export default Spinner;
