import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
import UpdateUser from '../../components/updateUser/UpdateUser';
import Details from '../../components/detailsUser/Details';
import { getAllByDisplayValue } from '@testing-library/react';

const User = () => {

    const history = useNavigate();
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [email, setEmail]=useState([]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
   
    const handleOk = () => {
        setIsModalOpen(true);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
   
   
    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        };
        getUsers(1);
    }, []);

    const getUsers = (page) => {
        setLoading(true)
        axios.get(`https://test-back.authentify.upowa.org/api/user/all?page=${page}&size=8`)
            .then((resp) => {
                console.log(resp)
                setData(resp.data.content)
                setTotalPages(resp.data.totalPages)
                setLoading(false)
                setUser(resp.data.content.email)
                console.log(email)
                
            }
            )
            .catch(err => console.log(err))
    }
    

    
        // Changez la fonction pour ne déclencher le bouton View que si l'utilisateur clique dessus.
        const handleClick = (record) => {
          setIsModalOpen(true);
          if (user.length > 0) {
            const filteredUser = user.filter(user => user.email === record.email);
            if (filteredUser.length > 0) {
              setEmail(filteredUser[0]);
            } 
          }
        }
    
        
    
    //   useEffect(() => {
    //     onView();
    //   }, []);
   

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
                    {/* <Button type="primary" onClick={showModal}> View </Button>
                 <Details open={isModalOpen} 
                 onCancel={handleCancel} 
                 email={email}
                 /> */}
                 <NavLink to={`/Details/${data}`}>View</NavLink>
                    <a>update</a>
                </Space>
            ),
            key: 'action',
        },
    ];

   

   
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