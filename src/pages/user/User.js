import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const history = useNavigate();
    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if (email === '' || email === null) {
            history('/Signin')
        }

    }, []);
    return (
        <div>
            <div>
                <h1>
                    List users
                </h1>
            </div>
        </div>
    );
};

export default User;