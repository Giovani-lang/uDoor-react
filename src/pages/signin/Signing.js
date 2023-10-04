import React, { useState } from "react";
import Navigation from '../../components/signin/Navigation';
import './signin.css';
import logo from '../../assets/logo upowa.png'
import wallpaper from '../../assets/wallpaper.png'
import axios from "axios";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Signing = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, getResponse] = useState("");


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
                        console.log("Connexion réussie");
                        window.location = "/home";

                    } else {
                        console.log("Le mot de passe  est incorrect.");
                    }

                } else {
                    console.log(alert("Un problème s'est produit durant la récupération des informations"));
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
                        <form className='text' onSubmit={handleSubmit}>
                            <div className="field-input">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='input'
                                    id="email" required />
                            </div>
                            <div className="field-input">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='input'
                                    id="password" required />
                            </div>
                            <button className="btn btn-primary">Log In</button>
                            <div className="navigation"><Navigation /></div>
                        </form>
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