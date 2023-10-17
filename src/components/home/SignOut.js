import React from 'react';
import { NavLink } from 'react-router-dom';



const SignOut = () => {
    return (
        <div >
            <NavLink to='/Signin'>
                LOGOUT
            </NavLink>
        </div>
    );
};

export default SignOut;