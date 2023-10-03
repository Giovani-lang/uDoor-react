import React, { useState } from 'react';
import Signin from '../../components/signup/Signin';
import './Signup.css';
import Wallpaper from "../../assets/wallpaper.png";
import Logo from "../../assets/logo upowa.png";
import axios from 'axios';


const Signup = () => {

    const url = "https://test-back.authentify.upowa.org/api/user/add";
    const [messageApi, contextHolder] = message.useMessage();


    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        profil: "",
        phone: ""
    });

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    function handleSubmit(event) {
        event.preventDefault()
        axios.post(url, data)
            .then(resp => {
                if (resp.status === 201) {
                    messageApi.open({
                        type: 'success',
                        content: 'This is a success message',
                    });

                    alert('User registered successfully')
                }
                window.location = '/signin';
            })
            .catch(err => {
                console.log(err)
            })
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            if (err.response.status === 409) {
                messageApi.open({
                    type: 'error',
                    content: 'This user already exist !!!',
                });
                // alert('This user already exist !!!')
            } else if (err.response.status === 500) {
                alert('A problem occurred while saving information')
            }
        })
    };


    return (
        <div className='global'>
            <div className='form'>
                <div id='logo1'>
                    <img src={Logo} alt="Logo" />
                </div>
                <h1>Create your <br /> account </h1>
                <form onSubmit={handleSubmit} className='registration-form'>
                    <input onChange={handleInput} name="firstname" type='text' placeholder='firstname' required />
                    <input onChange={handleInput} name="lastname" type='text' placeholder='lastname' required />
                    <input onChange={handleInput} name="email" type='email' placeholder='email' required />
                    <input onChange={handleInput} name="password" type='password' placeholder='password' required />
                    <select onChange={handleInput} name='profil' required>
                        <option selected disabled >Profil</option>
                        <option>User</option>
                        <option>Admin</option>
                    </select>
                    <input onChange={handleInput} name="phone" type='text' placeholder='phone' required />
                    <button>Register</button>
                </form>
                <Signin />
            </div>
            <div className='image'>
                <div id='logo2'>
                    <img src={Logo} alt="Logo" />
                </div>
                <img src={Wallpaper} alt="wallpaper" className='img1' />
            </div>
        </div>
    );
};

export default Signup;