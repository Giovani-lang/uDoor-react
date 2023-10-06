import React from 'react';
import { NavLink } from 'react-router-dom';

const signin = () => {
    return (
        <div> 
            <ul>
            <small>
            Already have an account?
            <NavLink to="/Signin">
                Sign In
            </NavLink>
            </small>
            </ul>
        </div>
    );
};

export default signin;