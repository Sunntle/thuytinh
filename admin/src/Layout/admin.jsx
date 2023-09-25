import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/header";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
import { NAV_ITEMS } from "../utils/constant";
const LayoutMain = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <div className="bg-main relative ">
      <header className="sticky top-0 w-full z-10">
        <HeaderComponent />
      </header>
      <main className="main_area rounded-3xl">
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
