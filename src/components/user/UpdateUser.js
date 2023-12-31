import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Modal, Select, Space, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, EditOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { imageDB } from './firebase-config'
import { v4 } from 'uuid'


const { Option } = Select;
const UpdateUser = ({ user, onUserAdded }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const passwordValidator = (_, value) => {
        if (value && value.length < 8) {
            return Promise.reject(new Error('The password must contain at least 8 characters'));
        }
        return Promise.resolve();
    };
    const phoneValidator = (rule, value, callback) => {
        const phoneRegex = /^(\+\d{1,3})?\d{9}$/;
        if (!phoneRegex.test(value)) {
            callback('Please enter a valid phone number');
        } else {
            callback();
        }
    };
    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        profil: "",
        phone: "",
        statut: "",
        image_url: "",
    });


    const [image, setImage] = useState("")

    const handleImageSelected = (event) => {
        const img = event.target.files[0];
        setImage(img)
    }

    const handleImageUpload = async () => {
        if (image) {
            const storageRef = ref(imageDB, `udoor/images/${v4()}`);
            try {
                const snapshot = await uploadBytes(storageRef, image);

                const downloadURL = await getDownloadURL(snapshot.ref);
                return downloadURL
            } catch (error) {
                console.error('Erreur lors du téléchargement de l\'image :', error);
                throw error;
            }
        }
    }

    const onUpdate = async (values) => {
        const imageUrl = await handleImageUpload();
        values.image_url = imageUrl
        console.log(values.image_url)
        console.log(values)
        axios.put(`https://test-back.authentify.upowa.org/api/user/update/${user.email}`, values)
            .then((resp) => {
                setValue(resp.data)
                if (resp.status === 201) {
                    message.success('User update succesfull');
                    handleCancel();
                    onUserAdded();
                }
            }).catch(err => {
                console.log(err)
            })
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            if (err.response.status === 409) {
                message.warning('This user already exist, try again !')
                setIsModalOpen(true);
            } else if (err.response.status === 500) {
                message.warning('A problem occurred while saving information !')
                setIsModalOpen(true);
            }
        })

    };
    const handleCancel = () => {
        setIsModalOpen(false);
        onUserAdded()
        
        
    };

    return (
        <>
            <Button type="primary" onClick={showModal} icon={<EditOutlined />}>
                Update
            </Button>
            <Modal
                open={isModalOpen}
                title="Update an account"
                okText="Update"
                cancelText="Cancel"
                onCancel={handleCancel}
                onClose={handleCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onUpdate(values);
                            setIsModalOpen(true);
                        })
                        .catch((info) => {
                            console.log('Update Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    onFinish={(values) => {
                        console.log(values);
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <Form.Item
                            name={"firstname"}
                            initialValue={user.firstname}
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
                            <Input placeholder='firstname' style={{ width: '230px', marginRight: '10px' }}
                                prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name={"lastname"}
                            initialValue={user.lastname}
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
                            <Input placeholder='lastname' style={{ width: '230px', marginRight: '10px' }}
                                prefix={<UserOutlined />} />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Form.Item
                            name={"email"}
                            initialValue={user.email}
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
                            <Input placeholder='email' style={{ width: '230px', marginRight: '10px' }}
                                prefix={<MailOutlined />} />

                        </Form.Item>
                        <Form.Item
                            name={"password"}
                            initialValue={user.password}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please, enter your password',

                                },
                                {
                                    validator: passwordValidator,
                                },
                            ]}>
                            <Input.Password placeholder='password' style={{ width: '230px', marginRight: '10px' }}
                                prefix={<LockOutlined />} />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Form.Item >
                            <Space.Compact>
                                <Form.Item
                                    name={'profil'}
                                    initialValue={user.profil}
                                    noStyle
                                    rules={[{ required: true, message: 'Profil is required' }]}
                                >
                                    <Select placeholder="profil" style={{ width: '230px', marginRight: '10px' }}
                                    >
                                        <Option value="User">User</Option>
                                        <Option value="Admin">Admin</Option>
                                    </Select>
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item
                            name={"phone"}
                            initialValue={user.phone}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please, enter your phone number',

                                },
                                {
                                    validator: phoneValidator,
                                },
                            ]}>
                            <Input placeholder='phone' style={{ width: '230px', marginRight: '10px' }}
                                prefix={<PhoneOutlined />} />
                        </Form.Item>
                    </div>
                    <div
                        style={{ display: 'flex' }}>
                        <Form.Item >
                            <Space.Compact>
                                <Form.Item
                                    name={'statut'}
                                    noStyle
                                    initialValue={user.statut}
                                    rules={[{ required: false, message: 'Status is required' }]}
                                >
                                    <Select placeholder="statut" style={{ width: '230px', marginRight: '10px' }}>
                                        <Option value="Actif">Actif</Option>
                                        <Option value="Inactif">Inactif</Option>
                                    </Select>
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item>
                            <Input type='file' accept='.png,.jpeg,.jpg'
                                onChange={handleImageSelected}
                            />
                        </Form.Item>
                    </div>

                </Form>
            </Modal>
        </>
    );
};

export default UpdateUser;