import React, { useState } from 'react';
import Signin from '../../components/signup/Signin';
import './Signup.css';
import wallpaper from "../../assets/wallpaper.png";
import logo from "../../assets/logo upowa.png";
import axios from 'axios';
import { message, Form, Input, Button, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';


const { Option } = Select;

const Signup = () => {
    const url = "https://test-back.authentify.upowa.org/api/user/add";

    const history = useNavigate();

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        profil: "",
        phone: ""
    });

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    function handleSubmit(event) {
        event.preventDefault()
        axios.post(url, data)
            .then(resp => {
                if (resp.status === 201) {
                    message.success('User registered')
                    history('/Signin');
                }

            })
            .catch(err => {
                console.log(err)
            })
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            if (err.response.status === 409) {
                message.warning('This user already exist !!!')
            } else if (err.response.status === 500) {
                message.warning('A problem occurred while saving information')
            }
        })
    };


    return (

        <div className="bgform">
            <div className='container' >

                <div className='container-form'>
                    <div className='imageform'> <img src={logo} alt='logo upower' /></div>

                    <div className="form-login">
                        <h1>Create your <br /> account </h1>
                        <Form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex' }}>
                                <Form.Item
                                    name={"firstname"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please, enter your firstname',

                                        },
                                        {
                                            type: "text",
                                            message: 'firstname is not valid',
                                            warningOnly: true,

                                        },
                                    ]}>
                                    <Input onChange={handleInput} placeholder='firstname' style={{ width: '250px', marginRight: '10px' }} prefix={<UserOutlined />} />
                                </Form.Item>
                                <Form.Item
                                    name={"lastname"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please, enter your lastname',

                                        },
                                        {
                                            type: "text",
                                            message: 'lastname is not valid',
                                            warningOnly: true,

                                        },
                                    ]}
                                >
                                    <Input onChange={handleInput} placeholder='lastname' style={{ width: '250px', marginRight: '10px' }} prefix={<UserOutlined />} />
                                </Form.Item>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Form.Item
                                    name={"email"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please, enter your email',

                                        },
                                        {
                                            type: "email",
                                            message: 'email is not valid',
                                            warningOnly: true,

                                        },
                                    ]}
                                >
                                    <Input onChange={handleInput} placeholder='email' style={{ width: '250px', marginRight: '10px' }} prefix={<MailOutlined />} />

                                </Form.Item>
                                <Form.Item
                                    name={"password"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please, enter your password',

                                        },
                                        {
                                            type: "password",
                                            message: 'password is not valid',
                                            warningOnly: true,

                                        },
                                    ]}>
                                    <Input.Password onChange={handleInput} placeholder='password' style={{ width: '250px', marginRight: '10px' }} prefix={<LockOutlined />} />
                                </Form.Item>
                            </div>
                            <div style={{ display: 'flex' }}>
                                 <Form.Item
                                    name={"phone"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please, enter your phone number',

                                        },
                                        {
                                            type: "text",
                                            message: 'phone number is not valid',
                                            warningOnly: true,

                                        },
                                    ]}>
                                    <Input onChange={handleInput} placeholder='phone' style={{ width: '250px', marginRight: '10px' }} prefix={<PhoneOutlined />} />
                                </Form.Item>
                                <Form.Item >
                                    <Space.Compact>
                                        <Form.Item
                                            name={'profil'}
                                            noStyle
                                            rules={[{ required: true, message: 'Profil is required' }]}
                                        >
                                            <Select placeholder="profil" style={{ width: '250px', marginRight: '10px' }}>
                                                <Option value="User">User</Option>
                                                <Option value="Admin">Admin</Option>
                                            </Select>
                                        </Form.Item>
                                    </Space.Compact>
                                </Form.Item>
                               
                            </div>
                            <Form.Item>
                                <Button htmlType='submit' type="primary" style={{ width: '150px' }} onClick={handleSubmit}>Register</Button>
                            </Form.Item>
                            <div className="navigation"><Signin /></div>
                        </Form>
                    </div>
                </div>
                <div className='container-image'>
                    <div className="imlogo">
                        <img src={logo} alt='logo upower' />
                    </div>
                    <div >
                        <img src={wallpaper} alt='illustration' className='illogin' />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;