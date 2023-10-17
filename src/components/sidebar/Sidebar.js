import React from 'react';
import {
    HomeOutlined,
    TeamOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import SignOut from '../home/SignOut';
import { NavLink } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(<NavLink to='/'>Home</NavLink>, '1', <HomeOutlined />),
    getItem(<NavLink to='/user'>Users</NavLink>, '2', <TeamOutlined />),
    getItem(<SignOut />, '3', <LogoutOutlined style={{ color: 'red' }} />)

];
const Sidebar = () => {
    return (
        <Menu
            style={{
                width: 256,
                minHeight: '100vh',
                marginLeft: '-14px',
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            theme='dark'
        />
    );
};
export default Sidebar;