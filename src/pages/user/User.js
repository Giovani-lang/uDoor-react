import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Space, Button } from 'antd';
import axios from 'axios';

const User = () => {

    const history = useNavigate();
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        };
        getUsers(1);
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

    const getUsers = (page) => {
        setLoading(true)
        axios.get(`https://test-back.authentify.upowa.org/api/user/all?page=${page}&size=8`)
            .then((resp) => {
                console.log(resp)
                setData(resp.data.content)
                setTotalPages(resp.data.totalPages)
                setLoading(false)
            }
            )
            .catch(err => console.log(err))
    }
    return (
        <div>

            <div style={{ marginLeft: '200px' }}>
                <Button style={{ margin: 8 }}>Add user</Button>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 8,
                        total: totalPages,
                        onChange: (page) => {
                            getUsers(page);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default User;