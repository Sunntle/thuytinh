import React from "react";
import "./index.css";

const ThanksPage = () => {
  return (
    <div className={`min-h-screen w-full bg-hero-pattern `}>
      <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-10/12 h-2/6 bg-white/50 shadow-lg bg-clip-padding backdrop-blur-lg space-y-5 flex justify-center items-center flex-col text-white">
        <span className="block text-4xl text-primary">Thủy Tinh</span>
        <span className="block w-10/12 text-zinc-600">
          Xin cảm ơn quý khách đã sử dụng dịch vụ của chúng em.
        </span>
        <span className="block">Chúc quý khách có 1 ngày vui vẻ !!!</span>
      </div>
    </div>
  );
};

export default ThanksPage;
