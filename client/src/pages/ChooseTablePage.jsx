import { Tabs } from "antd";
import { FiUsers } from "react-icons/fi";

const { TabPane } = Tabs;

const ChooseTablePage = () => {
  const onChange = (key) => {
    console.log(key);
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

  return (
    <div className="h-screen m-5">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        {items.map((item) => (
          <TabPane tab={item.tab} key={item.key}></TabPane>
        ))}
      </Tabs>
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
  );
};

export default ChooseTablePage;
