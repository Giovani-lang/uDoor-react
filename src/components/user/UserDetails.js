import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons'

const UserDetails = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get('https://test-back.authentify.upowa.org/api/user/detail?email=' + user.email)
    }, [])

    return (
        <>
            <Button type="primary" onClick={showModal} icon={<EyeOutlined />}>
                View
            </Button>
            <Modal title="Informations" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <p>Email: {user.email}</p>
                <p>Firstname: {user.firstname}</p>
                <p>Lastname: {user.lastname}</p>
                <p>Profil: {user.profil}</p>
                <p>Statut: {user.statut}</p>
                <p>Phone :{user.phone}</p>
            </Modal>
        </>
    );
};
export default UserDetails;