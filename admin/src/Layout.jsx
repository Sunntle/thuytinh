import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import HeaderComponent from './components/header'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
import { getItem } from './utils/format';
const items = [
    getItem('Option 1 sdfaereartrtet', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />)
];

const LayoutMain = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='bg-main'>
            <header>
                <HeaderComponent />
            </header>
            <main className='main_area'>
                <Layout className='layout_area' >
                    <Sider className='layout_area_sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                        <Menu defaultSelectedKeys={['1']} theme='light' mode="inline" items={items} />
                    </Sider>
                    <Layout>
                        <Content >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </main>
        </div>
    )
}

export default LayoutMain