import React, { useState } from 'react';
import { SettingOutlined, LogoutOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

const Navibar = () => {

    const history = useNavigate();
    const items = [

        {

            style: {marginLeft: '1360px', color: 'white', marginTop: '8px' },
            label: 'Settings',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [


                {
                    label: (
                        <NavLink to="/profil">
                            My Profile
                        </NavLink>
                    ),
                    key: 'setting:1',
                    icon: <UserOutlined />,
                },

                {
                    label: (
                        <NavLink to="/signin" style={{ color: 'red' }}>
                            Logout
                        </NavLink>
                    ),
                    key: 'alipay',
                    icon: <LogoutOutlined style={{ color: 'red' }}></LogoutOutlined>,
                },

            ],
        },

    ];

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (

        <Menu style={{ position: 'fixed', zIndex: 0, backgroundColor: '#001529', width: '1600px', marginLeft: '-8px', marginTop: '-10px' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} ></Menu>);
};

export default Navibar;