import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Space } from 'antd';
import axios from 'axios';
import AddUser from '../../components/user/AddUser';

const User = () => {
    const url = 'https://test-back.authentify.upowa.org/api/user/all?page=1&size=10000'
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
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Profil',
            dataIndex: 'profil',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Update</a>
                    <a>View</a>
                </Space>
            ),
        },
    ];

    const getUsers = () => {
        setLoading(true)
        axios.get(url)
            .then((resp) => {
                setData(resp.data.content)
                setLoading(false)
            }
            )
            .catch(err => console.log(err))
    }
    return (
        <div>

            <div style={{ marginLeft: '20px', width: '80vw' }}>
                <AddUser />
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 8,
                        total: data.totaPages
                    }}
                />
            </div>
        </div>
    );
};

export default User;