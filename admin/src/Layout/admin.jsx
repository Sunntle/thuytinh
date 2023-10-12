import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Space, notification } from 'antd';
import HeaderComponent from "../components/header";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
import { NAV_ITEMS } from "../utils/constant";
import ButtonComponents from "../components/button";
import { socket } from "../socket";
const LayoutMain = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const openNotification = useCallback(() => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <ButtonComponents type="primary" size="small" content="Xóa tất cả" className="text-main border-secondaryColor" onClick={() => api.destroy()}/>
      </Space>
    );
    api.open({
      message: 'Thông báo mới',
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      placement: 'bottomRight',
      onClose: () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  },
    });
  },[api]);
  useEffect(()=>{
    socket.on("new message", () =>{
      openNotification()
    })
    return socket.off("new message")
  },[openNotification])
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div className="bg-main relative">
         <div>
         {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Open the notification box
      </Button>
         </div>
      <header className="sticky top-0 w-full z-10">
        <HeaderComponent />

      </header>
      <main className="main_area rounded-t-3xl">
        <Layout className="layout_area">
          <Sider
            breakpoint="lg"
            width={250}
            className="layout_area_sider"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              style={{ border: "none" }}
              defaultSelectedKeys={pathname}
              theme="light"
              mode="inline"
              items={NAV_ITEMS}
              onClick={onClick}
            />
          </Sider>
          <Layout className="bg-white">
            <Content className="w-full">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </main>
    </div>
  );
};

export default LayoutMain;
