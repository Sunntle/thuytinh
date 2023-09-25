import React from "react";
import product from "../assets/images/product.png";

const TabFood = () => {
  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      <div className="flex items-center justify-center space-x-6">
        <p className="px-4 py-2 border black rounded-full text-white bg-primary">
          Lẩu
        </p>
        <p className="px-4 py-2 border black bg-white rounded-full">Nướng</p>
        <p className="px-4 py-2 border black bg-white rounded-full">Xào</p>
        <p className="px-4 py-2 border black bg-white rounded-full">Chiên</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl p-4 rounded-lg relative">
          <span className="bg-red-100 border border-primary rounded-full text-primary text-sm px-4 py-1 inline-block mb-4 ">
            Sale
          </span>
          <img
            className="w-3/4 mx-auto transform transition duration-300 hover:scale-105 cursor-pointer"
            src={product}
            alt=""
          />
          <div className="flex flex-col items-center my-3 space-y-2">
            <h1 className="text-gray-900 text-lg">Tôm hùm ngon số 1</h1>
            <h2 className="text-gray-900 text-xl font-bold">100.000VNĐ</h2>
            <button className="bg-primary text-white px-8 py-2 focus:outline-none rounded-full mt-24 transform transition duration-300 hover:scale-105">
              Thêm món
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl p-4 rounded-lg relative">
          <span className="bg-red-100 border border-primary rounded-full text-primary text-sm px-4 py-1 inline-block mb-4 ">
            Sale
          </span>
          <img
            className="w-3/4 mx-auto transform transition duration-300 hover:scale-105 cursor-pointer"
            src={product}
            alt=""
          />
          <div className="flex flex-col items-center my-3 space-y-2">
            <h1 className="text-gray-900 text-lg">Tôm hùm ngon số 1</h1>
            <h2 className="text-gray-900 text-xl font-bold">100.000VNĐ</h2>
            <button className="bg-primary text-white px-8 py-2 focus:outline-none rounded-full mt-24 transform transition duration-300 hover:scale-105">
              Thêm món
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl p-4 rounded-lg relative">
          <span className="bg-red-100 border border-primary rounded-full text-primary text-sm px-4 py-1 inline-block mb-4 ">
            Sale
          </span>
          <img
            className="w-3/4 mx-auto transform transition duration-300 hover:scale-105 cursor-pointer"
            src={product}
            alt=""
          />
          <div className="flex flex-col items-center my-3 space-y-2">
            <h1 className="text-gray-900 text-lg">Tôm hùm ngon số 1</h1>
            <h2 className="text-gray-900 text-xl font-bold">100.000VNĐ</h2>
            <button className="bg-primary text-white px-8 py-2 focus:outline-none rounded-full mt-24 transform transition duration-300 hover:scale-105">
              Thêm món
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl p-4 rounded-lg relative">
          <span className="bg-red-100 border border-primary rounded-full text-primary text-sm px-4 py-1 inline-block mb-4 ">
            Sale
          </span>
          <img
            className="w-3/4 mx-auto transform transition duration-300 hover:scale-105 cursor-pointer"
            src={product}
            alt=""
          />
          <div className="flex flex-col items-center my-3 space-y-2">
            <h1 className="text-gray-900 text-lg">Tôm hùm ngon số 1</h1>
            <h2 className="text-gray-900 text-xl font-bold">100.000VNĐ</h2>
            <button className="bg-primary text-white px-8 py-2 focus:outline-none rounded-full mt-24 transform transition duration-300 hover:scale-105">
              Thêm món
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl p-4 rounded-lg relative">
          <span className="bg-red-100 border border-primary rounded-full text-primary text-sm px-4 py-1 inline-block mb-4 ">
            Sale
          </span>
          <img
            className="w-3/4 mx-auto transform transition duration-300 hover:scale-105 cursor-pointer"
            src={product}
            alt=""
          />
          <div className="flex flex-col items-center my-3 space-y-2">
            <h1 className="text-gray-900 text-lg">Tôm hùm ngon số 1</h1>
            <h2 className="text-gray-900 text-xl font-bold">100.000VNĐ</h2>
            <button className="bg-primary text-white px-8 py-2 focus:outline-none rounded-full mt-24 transform transition duration-300 hover:scale-105">
              Thêm món
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabFood;
