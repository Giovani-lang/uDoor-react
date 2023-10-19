import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Space } from 'antd';
import axios from 'axios';
import AddUser from '../../components/user/AddUser';
import UserDetails from '../../components/user/UserDetails';

const User = () => {
    const url = 'https://test-back.authentify.upowa.org/api/user/all?page=2&size=10000'
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        };
        getUsers();
    }, []);

    const columns = [
        {
            title: 'Firstname',
            dataIndex: 'firstname',
            key: 'firstname'
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Profil',
            dataIndex: 'profil',
            key: 'profil'
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <UserDetails user={record} />
                </Space>
            ),
        },
    ];

    const getUsers = () => {
        setLoading(true)
        axios.get(url)
            .then((resp) => {
                // console.log(resp.data)
                setData(resp.data.content)
                setLoading(false)
            }
            )
            .catch(err => console.log(err))
    };
    const onUserAdded = () => {
        getUsers()
    };
    return (
        <div>

            <div style={{ marginLeft: '20px', width: '80vw', marginTop: '20px' }}>
                <AddUser onUserAdded={onUserAdded} />
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 7,
                        total: data.totaPages
                    }}
                />
            </div>
        </div>
    );
};

export default User;