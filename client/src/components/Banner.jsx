import React from "react";

const Banner = () => {

  return (
    <section className="relative mt-[-20px] h-96 w-full bg-cover bg-center bg-gray-300 bg-[url('https://static.thehoneycombers.com/wp-content/uploads/sites/2/2022/03/sydney-restaurants-woodcut-900x643.png')]">
      <div className="flex flex-col items-center justify-center absolute inset-0 bg-black bg-opacity-40">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200">
          Nhà hàng Thuỷ Tinh - Lung linh cho mọi bữa tiệc
        </h1>
        <div className="rounded-full p-1 box-border mt-8 bg-white overflow-hidden w-80 md:w-96 flex items-center">
          <input
            type="text"
            className="rounded-full px-4 outline-none w-full"
            placeholder="Tìm kiếm..."
          />
          <button className="text-sm bg-primary py-3 px-6 rounded-full text-white poppins hover:bg-[#F0A500E5] transition duration-300 hover:scale-105 transform">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
