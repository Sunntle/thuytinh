import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/header';
import { BiCategory } from 'react-icons/bi'
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
import { getItem } from '../utils/format';
const items = [
  getItem("Tổng quan", null, <BiCategory />, [
    getItem("Dashboard", "/"),
    getItem("Thực đơn món ăn", "/menu"),
    getItem("Bill ", "/order"),
    getItem("Đánh giá", "/rate"),
  ]),
  getItem("Nhà hàng", "/restaurant", <BiCategory />,[
    getItem("Chọn bàn","/employee/choosetable"),
    getItem("Thực đơn món ăn","/employee/menu"),
    getItem("Doanh thu","/employee/renvenue")
  ]),
];

const LayoutMain = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <div className="bg-main relative">
      <header className="sticky top-0 w-full z-10">
        <HeaderComponent />
      </header>
      <main className="main_area">
        <Layout className="layout_area">
          <Sider
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
              items={items}
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
