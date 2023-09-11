import React, { useState } from "react";
import './index.css'
import { FiSearch } from "react-icons/fi";
import product from "../../assets/images/product.png";
import { AiFillPlusCircle } from "react-icons/ai";
import Backdrop from "../../components/Backdrop.jsx";

const Menu = () => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="pb-24 text-slate-800">
      <div className="flex flex-col px-6 mt-8 space-y-4">
        <div className="grid grid-cols-12 gap-4 text-slate-500 ">
          <div className="col-span-10 w-full h-12 bg-slate-100 rounded-lg flex justify-start items-center space-x-3 px-2">
            <FiSearch className="w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              className="h-full bg-transparent focus:outline-none text-sm"
            />
          </div>
          {/*<div className="col-span-2 w-full h-12 bg-slate-100 rounded-lg p-2 flex justify-center items-center">*/}
          {/*    <VscSettings className="w-5 h-5"/>*/}
          {/*</div>*/}
        </div>
        {/*Category*/}
        <div className="relative w-full text-sm">
          <span className="text-base font-medium block mb-3">Danh mục</span>
          <div className=" flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
            <button
              onClick={() => setActive(!active)}
              className={`px-4 py-2 border rounded-full whitespace-nowrap transition-colors duration-100 ${
                active
                  ? "text-white bg-primary drop-shadow"
                  : "text-slate-800 bg-white"
              }`}
            >
              Tất cả
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full whitespace-nowrap">
              Đồ nướng
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Lẩu
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Hấp
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Xào
            </button>
            <button className="px-4 py-2 border black bg-white rounded-full">
              Chiên
            </button>
          </div>
          {/* Overlay */}
          <div className="absolute right-0 bottom-0 w-12 h-1/2 bg-white bg-opacity-60"></div>
        </div>
        {/* Filter with material */}
        {active && (
          <div className="relative w-full text-sm">
            <div className=" flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Tôm
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Cua
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Cá
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Ốc
              </button>
              <button className="px-2 py-1 border black bg-white rounded-lg active:bg-primary active:text-white transition-colors duration-300">
                Mực
              </button>
            </div>
            {/* Overlay */}
            <div className="absolute right-0 bottom-0 w-12 h-1/2 bg-white bg-opacity-60"></div>
          </div>
        )}
        {/*Food*/}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            onClick={toggleModal}
            className="w-auto h-auto border rounded-lg"
          >
            <div className="w-full">
              <img
                className="w-full h-full rounded-t-lg"
                src={product}
                alt=""
              />
            </div>
            <div className="flex justify-between items-center p-2 text-slate-500">
              <div>
                <span className="text-sm font-medium overflow-hidden block">
                  Tôm hùm ngon số 1
                </span>
                <span className="text-xs">150.000 VNĐ</span>
              </div>
              <button>
                <AiFillPlusCircle className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
          <div className="w-auto h-auto border rounded-lg">
            <div className="w-full">
              <img
                className="w-full h-full rounded-t-lg"
                src={product}
                alt=""
              />
            </div>
            <div className="flex justify-between items-center p-2 text-slate-500">
              <div>
                <span className="text-sm font-medium overflow-hidden block">
                  Tôm hùm ngon số 1
                </span>
                <span className="text-xs">150.000 VNĐ</span>
              </div>
              <button>
                <AiFillPlusCircle className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
          <div className="w-auto h-auto border rounded-lg">
            <div className="w-full">
              <img
                className="w-full h-full rounded-t-lg"
                src={product}
                alt=""
              />
            </div>
            <div className="flex justify-between items-center p-2 text-slate-500">
              <div>
                <span className="text-sm font-medium overflow-hidden block">
                  Tôm hùm ngon số 1
                </span>
                <span className="text-xs">150.000 VNĐ</span>
              </div>
              <button>
                <AiFillPlusCircle className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
          <div className="w-auto h-auto border rounded-lg">
            <div className="w-full">
              <img
                className="w-full h-full rounded-t-lg"
                src={product}
                alt=""
              />
            </div>
            <div className="flex justify-between items-center p-2 text-slate-500">
              <div>
                <span className="text-sm font-medium overflow-hidden block">
                  Tôm hùm ngon số 1
                </span>
                <span className="text-xs">150.000 VNĐ</span>
              </div>
              <button>
                <AiFillPlusCircle className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
          <div className="w-auto h-auto border rounded-lg">
            <div className="w-full">
              <img
                className="w-full h-full rounded-t-lg"
                src={product}
                alt=""
              />
            </div>
            <div className="flex justify-between items-center p-2 text-slate-500">
              <div>
                <span className="text-sm font-medium overflow-hidden block">
                  Tôm hùm ngon số 1
                </span>
                <span className="text-xs">150.000 VNĐ</span>
              </div>
              <button>
                <AiFillPlusCircle className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
          <div className="w-auto h-auto border rounded-lg">
            <div className="w-full">
              <img
                className="w-full h-full rounded-t-lg"
                src={product}
                alt=""
              />
            </div>
            <div className="flex justify-between items-center p-2 text-slate-500">
              <div>
                <span className="text-sm font-medium overflow-hidden block">
                  Tôm hùm ngon số 1
                </span>
                <span className="text-xs">150.000 VNĐ</span>
              </div>
              <button>
                <AiFillPlusCircle className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
          <div className="w-auto h-auto border rounded-lg">
            <div className="w-full">
              <img
                className="w-full h-full rounded-t-lg"
                src={product}
                alt=""
              />
            </div>
            <div className="flex justify-between items-center p-2 text-slate-500">
              <div>
                <span className="text-sm font-medium overflow-hidden block">
                  Tôm hùm ngon số 1
                </span>
                <span className="text-xs">150.000 VNĐ</span>
              </div>
              <button>
                <AiFillPlusCircle className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <>
          <Backdrop onClick={toggleModal} />
          <div className="fixed w-full bottom-0 translate-y-0 bg-white p-4 rounded shadow-lg z-50">
            {/* Your modal content */}
            <h2 className="text-lg font-semibold mb-2">Modal Content</h2>
            <p>This is the modal content.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={toggleModal}
            >
              Close Modal
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
