import React, { useState } from 'react';
import NavAccueil from '../../components/home/NavAccueil';
import {AppstoreOutlined, TeamOutlined, LogoutOutlined,} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink } from 'react-router-dom';
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
    getItem(<NavLink to='/'>Home</NavLink>, '1', <AppstoreOutlined />),
    getItem(<NavLink to='/user'>Users</NavLink>, '2', <TeamOutlined />),
    getItem(<NavLink to='/Signin'> LOGOUT</NavLink>, '3', <LogoutOutlined/>),
    
];
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    return (
        <Layout
            style={{
                minHeight: '95vh',
                marginTop: '-10px',
                marginLeft: '-14px',

            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" style={{width:'10px' }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
        </Layout>
    );
};
export default Sidebar;