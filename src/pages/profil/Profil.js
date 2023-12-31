import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import './Profil.css';
import { Tabs } from 'antd';
import { message, Form, Input, Button, Select, Space } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, MonitorOutlined, EditOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { imageDB } from '../../components/user/firebase-config'
import { v4 } from 'uuid'


const { Option } = Select;

const Profil = () => {


    const history = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        profil: "",
        phone: "",
        statut: "",
        image_url: ""
    });

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
    let email;
    useEffect(() => {
        email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        }
        getProfil();

    }, []);

    const getProfil = () => {
        axios.get('https://test-back.authentify.upowa.org/api/user/detail?email=' + email)
            .then((resp) => {
                setUser(resp.data)
            })
    }

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
        axios.put('https://test-back.authentify.upowa.org/api/user/update/' + user.email, values)
            .then(resp => {
                console.log(resp)
                setUser(resp.data)
                if (resp.status === 201) {
                    message.success('Successfully')
                }
            })
            .catch(err => {
                console.log(err)
            })
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            if (err.response.status === 409) {
                console.log('This user already exist !')
                message.warning('This user already exist, try again !')
            } else if (err.response.status === 500) {
                message.warning('A problem occurred while saving information !')
            }
        })
    };

    const onChange = (key) => { };
    const items = [
        {
            key: '1',
            label: 'Profil',
            children: (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '15% 85%', gridGap: '15px' }}>
                        <span>
                            <MailOutlined style={{ backgroundColor: '#0078d4', borderRadius: '30px', width: '50px', height: '50px', justifyContent: 'center' }} />
                        </span>
                        <span>
                            <strong>Email</strong>
                            <br /><a href='mailto:someone@example.com'>{user.email}</a>
                        </span>
                    </div>
                    <hr />
                    <div style={{ display: 'grid', gridTemplateColumns: '15% 85%', gridGap: '15px', height: '50px' }}>
                        <span>
                            <UserOutlined style={{ backgroundColor: '#0078d4', borderRadius: '30px', width: '50px', height: '50px', justifyContent: 'center' }} />
                        </span>
                        <span>
                            <strong>Profil</strong>
                            <br /><p style={{ margin: 0, color: 'gray' }}>{user.profil}</p>
                        </span>
                    </div>
                    <hr />
                    <div style={{ display: 'grid', gridTemplateColumns: '15% 85%', gridGap: '15px' }}>
                        <span>
                            <MonitorOutlined style={{ backgroundColor: '#0078d4', borderRadius: '30px', width: '50px', height: '50px', justifyContent: 'center' }} />
                        </span>
                        <span>
                            <strong>Statut</strong>
                            <br /><p style={{ margin: 0, color: 'gray' }}>{user.statut}</p>
                        </span>
                    </div>
                    <hr />
                    <div style={{ display: 'grid', gridTemplateColumns: '15% 85%', gridGap: '15px', height: '50px' }}>
                        <span>
                            <PhoneOutlined style={{ backgroundColor: '#0078d4', borderRadius: '30px', width: '50px', height: '50px', justifyContent: 'center' }} />
                        </span>
                        <span>
                            <strong>Phone</strong>
                            <br /><p style={{ margin: 0, color: 'gray' }}>{user.phone}</p>
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Update',
            children: (
                <div>
                    <Form
                        onFinish={onUpdate}
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
                        <Button htmlType='submit' type="primary" icon={<EditOutlined />}>
                            Update
                        </Button>
                    </Form>
                </div>
            ),
        }
    ];

    return (
        <div className='profil'>
            <Card
                style={{
                    backgroundImage: 'linear-gradient(#0078d4,white,white)',
                    display: 'flex',
                    width: 400,
                    height: 450,
                    justifyContent: 'center',
                    borderRadius: '15px'
                }}
            >
                <div
                    className='.convert-image '
                >
                    <div style={{ textAlign: 'center' }}>
                        <h2 >{user.firstname} {user.lastname}</h2>
                    </div>
                    <div className='image'>
                        <img
                            className='img'
                            src={user.image_url || 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg'}
                        />
                    </div>
                </div>
            </Card>

            <div className='content'>
                <Card
                    style={{
                        width: 600,
                        height: 450,
                        borderRadius: '15px'
                    }}
                >
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </Card>
            </div>
        </div>
    );
};

export default Profil;