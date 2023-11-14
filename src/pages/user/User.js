import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Space, Input } from 'antd';
import axios from 'axios';
import AddUser from '../../components/user/AddUser';
import UserDetails from '../../components/user/UserDetails';
import UpdateUser from '../../components/user/UpdateUser';
import {SearchOutlined} from '@ant-design/icons';

const User = () => {
    const url = 'https://test-back.authentify.upowa.org/api/user/all?page=2&size=10000'
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('')
    const [filterData, setFilterdata]= useState([])



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
                    <UpdateUser user={record} onUserAdded={onUserAdded} />
                </Space>
            ),
        },
    ];

    const getUsers = (value) => {
        setLoading(true)
        axios.get(url)
            .then((resp) => {
                // console.log(resp.data)
                setData(resp.data.content)
                setFilterdata(resp.data.content)
                setLoading(false)
            }
            )
            .catch(err => console.log(err))
    };
    const onUserAdded = () => {
        getUsers()
    };

    useEffect(()=>{
        setFilterdata(data)
    },[data])
    const handleChange = (e) => {
        const getSearch = e.target.value.toLowerCase()
        setQuery(getSearch)
        if(getSearch.length > 0){
            const searchdata = data.filter((record)=>{
                return(                   
                    record.firstname.toLowerCase().includes(getSearch)||
                    record.lastname.toLowerCase().includes(getSearch)||
                    record.email.toLowerCase().includes(getSearch)||                    
                    record.profil.toLowerCase().includes(getSearch.toLowerCase())
                )   
                     
            })
            setFilterdata(searchdata)     
           
        }else{
            setFilterdata(data)
            
        }
        
    }
    return (
        <div style={{marginTop:'-10px'}}>

            <div style={{ marginLeft: '20px', width: '80vw', marginTop: '20px' }}>
                <AddUser onUserAdded={onUserAdded} />
                <div style={{backgroundColor:'grey', display:'flex', flexDirection:'row', borderRadius:'40px', }}>
                <SearchOutlined />
                <Input
                type='text' 
                placeholder='Type text search...'
                style={{borderRadius:'0px'}}
                allowClear
                value={query}
                onChange={handleChange}
                />

           
                </div>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={filterData}
                    filterValue= {query}
                    
                    
                    pagination={{
                        pageSize: 6,
                        total: data.totaPages
                    }}
                />
            </div>
        </div>
    );
};


export default User;