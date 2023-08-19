import { FichevronLeft } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";

const ChooseTableMobile = () => {
  return (
    <div className="w-12/12 h-screen text-slate-800">
      <div className="sm:hidden">
        <div className="space-y-5 p-4">
          <div className="flex justify-between item-center">
            <button>
              <FichevronLeft className="w-6 h-6" />
            </button>
            <span className="text-xl font-medium uppercase">Chọn bàn</span>
            <button>
              <HiTrash className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-200 bg-[#D1D5DB] text-white transition-colors hover:bg-yellow-500 hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid">
              <FiUsers className="w-6 h-6 mb-2" />
              Bàn 1
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-200 bg-[#D1D5DB] text-white transition-colors hover:bg-yellow-500 hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid">
              <FiUsers className="w-6 h-6 mb-2" />
              Bàn 2
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-200 bg-[#D1D5DB] text-white transition-colors hover:bg-yellow-500 hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid">
              <FiUsers className="w-6 h-6 mb-2" />
              Bàn 3
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-200 bg-[#D1D5DB] text-white transition-colors hover:bg-yellow-500 hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid">
              <FiUsers className="w-6 h-6 mb-2" />
              Bàn 4
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-200 bg-[#D1D5DB] text-white transition-colors hover:bg-yellow-500 hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid">
              <FiUsers className="w-6 h-6 mb-2" />
              Bàn 5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTableMobile;
