import React from 'react';
import {
    HomeOutlined,
    TeamOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import SignOut from '../home/SignOut';
import { NavLink } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
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
        <div style={{
            marginTop: "-19px"
        }}>
            <Header
                style={{
                    marginLeft: '-14px',
                }}
            >
                <h1 style={{ color: 'white' }}>uDoor</h1>
            </Header>
            < Menu
                style={{
                    width: 256,
                    minHeight: '90vh',
                    marginLeft: '-14px',
                }
                }
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                theme='dark'
            />
        </div>
    );
};
export default Sidebar;