import React from 'react';
import { NavLink } from 'react-router-dom';

const signin = () => {
    return (
        <div>
            Already have an account?
            <NavLink to="/Signin">
                Sign In
            </NavLink>
        </div>
    );
};

export default signin;