import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Modal, Upload, Select, Space, message } from 'antd';
import { MailOutlined, PlusOutlined, LockOutlined, UserOutlined, PhoneOutlined, EditOutlined, FileImageOutlined } from '@ant-design/icons';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });



const { Option } = Select;
const UpdateUser = ({ user }) => {
    const [users, setUsers] = useState([""]);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const newFileList = fileList;
    const handleClose = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        setFileList(newFileList)
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div  >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [values, setValue] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        profil: user.profil,
        phone: user.phone,
        statut: user.statut,
        image_url: user.image_url,
    });


    const onUpdate = async (values) => {

        axios.put('https://test-back.authentify.upowa.org/api/user/update/' + user.email, values)
            .then((resp) => {
                console.log(resp);
                setValue(resp.data)
                console.log(values)
                if (resp.status === 201) {
                    message.success('User update succesfull')
                    handleCancel()
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
                            setIsModalOpen(true);})
                        .catch((info) => {
                            console.log('Update Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    onFinish={(values)=>{
                        console.log(values);
                    }}
                    
                    
                >
                    <div style={{ display: 'flex' }}>
                        <Form.Item
                            name={"firstname"}
                            initialValue={values.firstname}
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
                        <Form.Item
                            name={"statut"}
                            initialValue={user.statut}
                            rules={[

                                {
                                    type: "text",
                                    warningOnly: true,

                                },
                            ]}>
                            <Input placeholder='statut' style={{ width: '230px', marginRight: '10px' }} />
                        </Form.Item>
                        <Form.Item
                            name={"image_url"}
                            initialValue={values.image_url}>
                            <div  style={{
                                    marginLeft:50,
                                    marginTop:-18,
                                    padding: 16,
                                  }}>
                            <Upload 
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture-card"
                               
                                fileList={fileList}
                                //appercu de l'image avec l'icone eye
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            </div>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleClose}>
                                <img
                                    alt="example"
                                    style={{
                                        width: '100%',
                                    }}
                                    src={previewImage}
                                />
                            </Modal>

                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateUser;