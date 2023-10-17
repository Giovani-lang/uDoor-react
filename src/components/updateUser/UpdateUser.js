import React from 'react';
import { message, Form, Input, Button, Select, Space, Modal } from 'antd';

const UpdateUser = ({ open, onCreate, onCancel }) => {
    const { Option } = Select;
    const [form] = Form.useForm();






    return (
        <div>
            <Modal
                open={open}
                title="Create a new collection"
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
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="firstname"
                        label="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the first name of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label="lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the lastname  of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the email  of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the password  of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="statut"
                        label="statut"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the statut  of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please phone   of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please phone   of collection!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="profil" className="profil">
                        <Select placeholder="profil" style={{ width: '250px', marginRight: '10px' }}>
                            <Option value="User">User</Option>
                            <Option value="Admin">Admin</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateUser;