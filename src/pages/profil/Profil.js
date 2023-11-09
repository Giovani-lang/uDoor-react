import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profil.css'



const Profil = () => {
    const history = useNavigate();

    let email;

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        profil: "",
        phone: "",
        statut: "",
        image_url: ""
    });

    useEffect(() => {
        email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        }

        getProfil();
    }, []);

    const getProfil = () => {
        axios.get('https://test-back.authentify.upowa.org/api/user/detail?email=' + email)
            .then((resp) => {
                console.log(resp.data)
                setUser(resp.data)
                console.log(user)
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='convert-image'>
                {/* <img src={user.image_url} /> */}
            </div>
            <div className='content'>
                Hello, world !

                {/* <p>{user.firstname}</p>
                <p>{user.lastname}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.profil}</p>
                <p>{user.statut}</p> */}
            </div>
        </div>
    );
};

export default Profil;