import React from 'react';
import { NavLink } from 'react-router-dom';
import {LogoutOutlined  } from '@ant-design/icons';
import { Button } from 'antd';


const SignOut = () => {
    return (
        <div >
        <NavLink to='/Signin'>
        <Button style={{ backgroundColor:'#3ba0e9'}}><LogoutOutlined/>LOGOUT</Button>
        </NavLink> 
     </div>
    );
};

export default SignOut;