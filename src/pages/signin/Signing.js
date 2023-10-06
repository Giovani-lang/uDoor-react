import React, { useContext, useEffect, useState, createContext } from "react";
import Navigation from '../../components/signin/Navigation';
import './signin.css';
import logo from '../../assets/logo upowa.png'
import wallpaper from '../../assets/wallpaper.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { message, Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const Signing = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useNavigate();

    useEffect(() => {
        sessionStorage.clear()
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);



        // Identifier l'utilisateur via son email

        axios.get("https://test-back.authentify.upowa.org/api/user/detail?email=" + email, {

        })
            .then((response) => {
                console.log(response);
                // Si l'utilisateur n'est pas identifié, renvoyer une erreur 404

                if (response.status === 404) {
                    console.log(alert("L'adresse email est incorrect"));

                } else if (response.status === 201) {
                    console.log("L'adresse email est correct");
                    // Récupérer le mot de passe de l'utilisateur

                    const expectedPassword = response.data.password;
                    console.log(expectedPassword);
                    // Comparer le mot de passe saisi avec le mot de passe attendu
                    if (password === expectedPassword) {
                        sessionStorage.setItem('email', email);
                        message.success("Connexion réussie");
                        history('/')


                    } else {
                        message.warning("Le mot de passe  est incorrect.");
                    }

                } else {
                    message.error("Un problème s'est produit durant la récupération des informations");
                }

                // code html du formulaire de login 
            })
            .catch(error => {
                console.log(error)
            })
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 404) {

                Swal.fire({
                    icon: 'error',
                    title: "L'adresse email est incorrect",
                    showConfirmButton: false, timer: 2000
                })
            }

        });
    };



    return (

        <div className="bgform">
            <div className='container' >

                <div className='container-form'>
                    <div className='imageform'> <img src={logo} alt='logo upower' /></div>

                    <div className="form-login">
                        <h1>Welcome back to <br /><font color="blue">Udoor</font></h1>
                        <small>Sign in to your account below</small>
                        <Form onSubmit={handleSubmit}>
                            <div className="field-input">
                                <Form.Item
                                    name={"email"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please, enter your email',

                                        },
                                        {
                                            type: "email",
                                            message: 'Email is not valid',
                                            warningOnly: true,

                                        },
                                    ]}>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'
                                        id="email"
                                        style={{ width: '400px' }}
                                        prefix={<MailOutlined />}
                                    />
                                </Form.Item>
                            </div>
                            <div className="field-input">
                                <Form.Item
                                    name={"password"}
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
                                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='input'
                                        id="password"
                                        style={{ width: '400px' }}
                                        prefix={<LockOutlined />}
                                    />
                                </Form.Item>
                            </div>
                            <Button htmlType="submit" type="primary" style={{ width: '150px' }} onClick={handleSubmit}>Log In</Button>
                            <div className="navigation"><Navigation /></div>
                        </Form>
                    </div>
                </div>
                <div className='container-image'>
                    <div className="imlogo">
                        <img src={logo} alt='logo upower' />
                    </div>
                    <div >
                        <img src={wallpaper} alt='illustration' className='illogin' />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signing;