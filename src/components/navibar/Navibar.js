import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined, UserOutlined,SearchOutlined } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import { Input, Space,Button } from 'antd';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const items = [

  

    {
        
        key: 'setting:1',
        icon:  <input type='search'
        className='inputsearch'
        placeholder="input search text"
        allowClear
        prefix=''
        // onSearch={onSearch}
        style={{height:'35px', marginLeft:'500px', marginTop:'10px', }}
      />,
        label:<Button className='button' style={{
            height:'33px',
            top:'3px', 
            margin:'0px', 
            color:'white', 
            backgroundColor:'blue',
            border:'none',
            
            }}>
        <SearchOutlined /></Button>
    },


    {

        style: { marginLeft: '350px', color: 'white', marginTop:'8px' },
        label: 'Settings',
        key: 'SubMenu',
        icon: <Avatar size="20"  icon={<UserOutlined style={{ marginLeft: '15px' }} />} />,
        children: [


            {
                label: 'My Profile',
                key: 'setting:1',
                icon: <UserOutlined />,
            },

            {
                label: (
                    <a href="/signin" style={{color:'red'}}>
                        Logout
                    </a>
                ),
                key: 'alipay',
                icon: <LogoutOutlined style={{color:'red'}}></LogoutOutlined>,
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

        <Menu style={{position:'fixed',zIndex:1, backgroundColor: '#001529', width:'1600px', marginLeft:'-8px', marginTop:'-10px' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} ></Menu>);
};

export default Navibar;