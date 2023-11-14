import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import './Profil.css';
import { Tabs } from 'antd';
import { message, Form, Input, Button, Select, Space } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, MonitorOutlined } from '@ant-design/icons';
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

    let email;
    useEffect(() => {
        email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        }
    }, []);

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
        console.log(values)
        axios.put('https://test-back.authentify.upowa.org/api/user/update/' + email, values)
            .then(resp => {
                setUser(resp)
                if (resp.status === 201) {
                    message.success('Successfully')
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
                console.log('This user already exist !')
                message.warning('This user already exist, try again !')
            } else if (err.response.status === 500) {
                message.warning('A problem occurred while saving information !')
            }
        })
    };



    return (
        <div className='profil'>

            <Card
                style={{

                    backgroundImage: 'linear-gradient(#0078d4,white,white)',
                    display: 'flex',
                    width: 300,
                    height: 350,
                    justifyContent: 'center',
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
                                    type: "password",
                                    message: 'password is not valid',
                                    warningOnly: true,

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
                                    type: "text",
                                    message: 'phone number is not valid',
                                    warningOnly: true,

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

                    <Form.Item>
                        <Button htmlType='submit' type="primary" style={{ width: '150px' }} onClick={onUpdate}>Update</Button>
                    </Form.Item>
                </Card>
            </div>
        </div>
    );
};

export default Profil;