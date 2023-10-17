import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import ampoule from '../../assets/ampoule.png'
import SignOut from '../../components/home/SignOut';

const Home = () => {
    const history = useNavigate();
    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        }
       

    }, []);

    return (
        <div >
       
        
        </div>
       
        
        
        
    );
};

export default Home;