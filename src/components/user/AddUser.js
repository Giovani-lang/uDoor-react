import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Modal, Select, Space, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, PlusCircleOutlined } from '@ant-design/icons';


const { Option } = Select;
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={open}
            title="Create a new account"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
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
                        <Input placeholder='firstname' style={{ width: '230px', marginRight: '10px' }} prefix={<UserOutlined />} />
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
                        <Input placeholder='lastname' style={{ width: '230px', marginRight: '10px' }} prefix={<UserOutlined />} />
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
                        <Input placeholder='email' style={{ width: '230px', marginRight: '10px' }} prefix={<MailOutlined />} />

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
                        <Input.Password placeholder='password' style={{ width: '230px', marginRight: '10px' }} prefix={<LockOutlined />} />
                    </Form.Item>
                </div>
                <div style={{ display: 'flex' }}>
                    <Form.Item >
                        <Space.Compact>
                            <Form.Item
                                name={'profil'}
                                noStyle
                                rules={[{ required: true, message: 'Profil is required' }]}
                            >
                                <Select placeholder="profil" style={{ width: '230px', marginRight: '10px' }}>
                                    <Option value="User">User</Option>
                                    <Option value="Admin">Admin</Option>
                                </Select>
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
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
                        <Input placeholder='phone' style={{ width: '230px', marginRight: '10px' }} prefix={<PhoneOutlined />} />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

const AddUser = ({ onUserAdded }) => {

    const url = "https://test-back.authentify.upowa.org/api/user/add";
    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        axios.post(url, values).then(resp => {
            if (resp.status === 201) {
                message.success('User registered')
                setOpen(false);
                onUserAdded()

            }

        }).catch(err => {
            console.log(err)
        })
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            if (err.response.status === 409) {
                message.warning('This user already exist, try again !')
                setOpen(true);
            } else if (err.response.status === 500) {
                message.warning('A problem occurred while saving information !')
                setOpen(true);
            }
        })
    };
    return (
        <div>
            <Button
                style={{ margin: 8, color:'white', fon: 'bold', backgroundColor: '#001529',  }}
                onClick={() => {
                    setOpen(true);
                }}
                icon={<PlusCircleOutlined />}
            >
                Add user
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default AddUser;
