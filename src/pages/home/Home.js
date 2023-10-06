import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <div>
                <h1>
                    Welcome to upowa
                </h1>
            </div>
        </div>
    );
};

export default Home;