import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Space, notification } from 'antd';
import HeaderComponent from "../components/header";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
import { NAV_ITEMS } from "../utils/constant";
import { socket } from "../socket";
import { useSelector } from "react-redux";
const LayoutMain = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [screen, setScreen] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const customize = useSelector(state => state.customize)
  const notifications = useSelector(state => state.notifications)
  const navigate = useNavigate();
  const openNotification = useCallback(() => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="primary" size="small" className="p-2" onClick={() => api.destroy()}>
          Ẩn thông báo
        </Button>
      </Space>
    );
    api.open({
      message: 'Thông báo mới',
      description:notifications.lastNotification && notifications.lastNotification?.description,
      btn,
      key,
      placement: 'bottomRight',
  //     onClose: () => {
  //   console.log(
  //     'Notification was closed. Either the close button was clicked or duration time elapsed.',
  //   );
  // },
    });
  },[api,notifications]);
  useEffect(()=>{
    socket.on("new message", () =>{
      openNotification()
    })
    return ()=>{
      socket.off("new message")
    }
  },[openNotification])
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div className="bg-main relative">
         <div>
         {contextHolder}
         </div>
      <header className="sticky top-0 w-full z-10">
        <HeaderComponent />

      </header>
      <main className="main_area rounded-t-3xl">
        <Layout className="layout_area" >
          <Sider
            theme={customize.darkMode ? 'dark' : 'light'}
            breakpoint="lg"
            width={250}
            className="layout_area_sider"
            collapsible={!screen}
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            onBreakpoint={(screen)=>setScreen(screen)}
          >
            <Menu
              style={{ border: "none" }}
              defaultSelectedKeys={pathname}
              theme={customize.darkMode ? 'dark' : 'light'}
              mode="inline"
              items={NAV_ITEMS}
              onClick={onClick}
            />
          </Sider>
          <Layout className={customize.darkMode ? 'bg-darkModeBg' : 'bg-white'}>
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
