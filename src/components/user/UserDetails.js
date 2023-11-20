import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal } from 'antd';
import { MailOutlined, UserOutlined, PhoneOutlined, EyeOutlined, MonitorOutlined } from '@ant-design/icons';




const UserDetails = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal} icon={<EyeOutlined />}>
                View
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} style={{ top: '70px', maxWidth: '350px' }}>
                <div style={{
                    display: 'grid',
                    gridGap: '10px'
                }}>
                    <div
                        style={{
                            marginTop: '30px',
                            boxSizing: 'border-box',
                            boxShadow: '0px 3px 2px 1px rgba( 0, 0, 0, 0.2)',
                            borderRadius: '15px',
                            backgroundImage: 'linear-gradient(white,white,#0078d4,#0078d4)',
                        }}
                    >
                        <div style={{ display: 'grid', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image
                                    src={user.image_url}
                                    fallback={'https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg'}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <strong>
                                    <h2>{user.firstname} {user.lastname}</h2>
                                </strong>
                            </div>
                        </div>
                    </div>
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
                </div>
            </Modal>
        </>
    );
};
export default UserDetails;