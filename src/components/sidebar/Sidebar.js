import React, { useMemo, useState } from 'react';
import {
    HomeOutlined,
    TeamOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import SignOut from '../home/SignOut';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<NavLink to='/'>Home</NavLink>, '1', <HomeOutlined />),
    getItem(<NavLink to='/user'>Users</NavLink>, '2', <TeamOutlined />),

];

const Sidebar = () => {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const itemsWithLogout = useMemo(() => {
        return [...items, getItem(<SignOut />, '3', <LogoutOutlined style={{ color: 'red' }} />)];
    }, [items]);
    if (
        location.pathname === '/'
        || location.pathname === '/user'
    ) {
        return (
            <Layout
                style={{
                    minHeight: '95vh',
                    marginTop: '-10px',
                    marginLeft: '-14px',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" style={{ width: '10px' }} />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={itemsWithLogout} />
                </Sider>

            </Layout>
        );
    } else {
        return null;
    }
};
export default Sidebar;