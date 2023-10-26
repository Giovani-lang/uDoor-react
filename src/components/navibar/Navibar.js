import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import { Input, Space } from 'antd';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const items = [

    {
        label: (
            <p style={{ marginLeft: '30px', marginTop: '-10px', color: 'white' }}>
                <h1>Udoor</h1>
            </p>
        ),
        key: 'alipay',
    },

    {
        
        key: 'setting:1',
        icon:  <Search
        placeholder="input search text"
        allowClear
        // onSearch={onSearch}
        style={{
          width: 500, 
          height:5,
          marginLeft:'300px'

        }}
      />,
    },


    {

        style: { marginLeft: '350px', color: 'white', marginTop:'15px' },
        label: 'Settings',
        key: 'SubMenu',
        icon: <Avatar size="20" backgroundColor='grey' icon={<UserOutlined style={{ marginLeft: '8px' }} />} />,
        children: [


            {
                label: 'My Profile',
                key: 'setting:1',
                icon: <UserOutlined />,
            },

            {
                label: (
                    <a href="/signin">
                        Logout
                    </a>
                ),
                key: 'alipay',
                icon: <LogoutOutlined></LogoutOutlined>,
            },

        ],
    },

];

const Navibar = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (

        <Menu style={{ backgroundColor: '#001529', width:'1519px', marginLeft:'-8px', marginTop:'-10px' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} ></Menu>);
};

export default Navibar;