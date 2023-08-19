import { Tabs } from "antd";
import { FiUsers, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState, useEffect } from "react";

const { TabPane } = Tabs;

const ChooseTablePage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleTableUseClick = () => {
    setShowSidebar(true);
  };

  const items = [
    {
      key: "1",
      tab: `Tab 1`,
    },
    {
      key: "2",
      tab: `Tab 2`,
    },
    {
      key: "3",
      tab: `Tab 3`,
    },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const tabletSidebarClass =
    showSidebar && windowWidth >= 640
      ? "mr-auto fixed right-0 top-0 bottom-0"
      : "-ml-1/4 hidden";

  const mobileSidebarClass =
    showSidebar && windowWidth < 640 ? "mr-auto fixed bottom-0" : "hidden";

  return (
    <div className="h-screen w-full">
      <div className="m-5 flex">
        <div className="flex-1 pr-4">
          <Tabs defaultActiveKey="1" className="mb-8">
            {items.map((item) => (
              <TabPane tab={item.tab} key={item.key}></TabPane>
            ))}
          </Tabs>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <button
              className="flex h-[200px] flex-col items-center justify-center p-4 rounded-lg shadow-md bg-yellow-500 text-white border-yellow-400 border-3px border-solid"
              onClick={() => handleTableUseClick()}
            >
              <FiUsers className="w-6 h-6 mb-2" />
              <span className="text-lg">Bàn 2</span>
              <span className="mt-2 text-white block">Đang sử dụng</span>
            </button>
            <button className="flex h-[200px] flex-col items-center justify-center p-4 rounded-lg shadow-md transition-colors hover:bg-yellow-500 hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid bg-[#D1D5DB] text-white">
              <FiUsers className="w-6 h-6 mb-2" />
              <span className="text-lg">Bàn 3</span>
            </button>
          </div>
        </div>
      </div>
      {/* sidebar tablet */}
      <div
        className={`w-1/4 bg-white h-screen p-5 shadow-md transition-all duration-300 ${tabletSidebarClass}`}
      >
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowSidebar(false)}
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-3">Bàn số: 2</h2>
        <div className="mb-3 flex justify-between">
          <span className="text-base font-normal">Tôm hấp bia</span>
          <span className="text-base font-normal">Số lượng: 1</span>
        </div>
        <div className="flex justify-center space-x-3 absolute bottom-0 left-0 w-full p-5">
          <button className="w-2/3 hover:bg-red-700 transition-colors duration-300 p-2 bg-red-600 text-white rounded focus:outline-none focus:ring focus:ring-red-600 flex items-center">
            <AiOutlineShoppingCart className="w-4 h-4 mr-1" />
            Thanh toán
          </button>
          <button className="w-full hover:bg-yellow-600 transition-colors duration-300 p-2 bg-[#F0A500E5] text-white rounded focus:outline-none focus:ring focus:ring-[#F0A500E5]">
            Tiếp tục chọn món
          </button>
        </div>
      </div>

      {/* sidebar mobile */}
      <div
        className={`w-full h-1/2 bg-white p-5 transition-all duration-300 ${mobileSidebarClass}`}
      >
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowSidebar(false)}
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-3">Bàn số: 2</h2>
        <div className="mb-3 flex justify-between">
          <span className="text-base font-normal">Tôm hấp bia</span>
          <span className="text-base font-normal">Số lượng: 1</span>
        </div>
        <div className="flex justify-center space-x-3 absolute bottom-0 left-0 w-full p-5">
          <button className="w-2/3 hover:bg-red-700 transition-colors duration-300 p-2 bg-red-600 text-white rounded focus:outline-none focus:ring focus:ring-red-600 flex items-center">
            <AiOutlineShoppingCart className="w-4 h-4 mr-1" />
            Thanh toán
          </button>
          <button className="w-full hover:bg-yellow-600 transition-colors duration-300 p-2 bg-[#F0A500E5] text-white rounded focus:outline-none focus:ring focus:ring-[#F0A500E5]">
            Tiếp tục chọn món
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseTablePage;
