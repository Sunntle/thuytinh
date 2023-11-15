import { Button, Layout, Menu, Space, notification } from 'antd';
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AudioNotify from "../assets/sound/notify.mp3";
import HeaderComponent from "../components/header";
import { addNewMessage } from "../redux/notification/notificationSystem";
import { socket } from "../socket";
import { NAV_ITEMS, NAV_ITEMS_ADMIN } from "../utils/constant";
const { Content, Sider } = Layout;
const LayoutMain = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [screen, setScreen] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((state) => state.account);
  const customize = useSelector(state => state.customize)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audio = useRef(null);

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
    });
  }, [api]);

  const playAudio = useCallback(() => {
    try {
      if (!audio.current) {
        audio.current = new Audio(AudioNotify);
      }
      if (audio.current) {
        audio.current.play();
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  },[]);
 
  useEffect(() => {
    socket.on("new message", async(arg) => {
      dispatch(addNewMessage(arg))
      openNotification(arg)
      playAudio();
    })
    return () => {
      socket.off("new message")
    }
  }, [openNotification, dispatch, playAudio])
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div className={`bg-main overflow-hidden relative ${customize.darkMode ? 'dark' : ''}`}>
      <div>
        {contextHolder}
      </div>
      <Helmet>
        <title>{pathname.includes('employee') ? 'Employee' : 'Dashboard Admin'}</title>
        <meta name="description" content="Admin" />
      </Helmet>
      <header className="sticky top-0 w-full z-10 ">
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      </header>
      <main className="main_area rounded-t-3xl overflow-hidden">
        <Layout className="layout_area ">
          <Sider
            theme={customize.darkMode ? 'dark' : 'light'}
            breakpoint="xl"
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
              items={user?.user.role == "R4" ? NAV_ITEMS_ADMIN: NAV_ITEMS}
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
