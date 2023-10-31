import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Space, notification } from 'antd';
import HeaderComponent from "../components/header";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
import { NAV_ITEMS } from "../utils/constant";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage } from "../redux/notification/notificationSystem";

const LayoutMain = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [screen, setScreen] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const customize = useSelector(state => state.customize)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openNotification = useCallback((arg) => {
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
      description: arg && arg.description,
      btn,
      key,
      placement: 'bottomRight',
      //     onClose: () => {
      //   console.log(
      //     'Notification was closed. Either the close button was clicked or duration time elapsed.',
      //   );
      // },
    });
  }, [api]);
  useEffect(() => {
    socket.on("new message", (arg) => {
      console.log(arg);
      dispatch(addNewMessage(arg))
      openNotification(arg)
    })
    return () => {
      socket.off("new message")
    }
  }, [openNotification, dispatch])
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div className={`bg-main overflow-hidden relative ${customize.darkMode ? 'dark' : ''}`}>
      <div>
        {contextHolder}
      </div>
      <header className="sticky top-0 w-full z-10 ">
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed}/>
      </header>
      <main className="main_area rounded-t-3xl overflow-hidden">
        <Layout className="layout_area ">
          <Sider
            theme={customize.darkMode ? 'dark' : 'light'}
            breakpoint="lg"
            className="layout_area_sider"
            trigger={null}
            collapsible={!screen}
            collapsed={collapsed}
            collapsedWidth="60"
            onCollapse={(value) => setCollapsed(value)}
            onBreakpoint={(screen) => setScreen(screen)}
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
          <Layout className="bg-white dark:bg-darkModeBg dark:text-white">
            <Content className="w-full" style={{ minHeight: "100vh" }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </main>
    </div>
  );
};

export default LayoutMain;
