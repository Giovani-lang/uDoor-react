import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import logo from '../../assets/logo upowa.png'



const Home = () => {

    const history = useNavigate();

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        }
    }, []);
    return (
        <div className="bgimg">
            <div >
                <img src={logo} className='header' />
                <h1 className='title'>Welcome to uDoor</h1>
            </div>
        </div >
    );
};

export default Home;