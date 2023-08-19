import { Tabs } from "antd";

const { TabPane } = Tabs;

const ChooseTablePage = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      tab: `Tab 1`,
      content: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      tab: `Tab 2`,
      content: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      tab: `Tab 3`,
      content: `Content of Tab Pane 3`,
    },
  ];

  return (
    <div className="h-screen m-5">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        {items.map((item) => (
          <TabPane tab={item.tab} key={item.key}>
            {item.content}
          </TabPane>
        ))}
      </Tabs>{" "}
    </div>
  );
};

export default ChooseTablePage;
