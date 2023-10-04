import React from 'react';
import { NavLink } from 'react-router-dom';

const signin = () => {
    return (
        <div>
            Already have an account?
            <NavLink to="/signin">
                Sign In
            </NavLink>
        </div>
    );
};

export default signin;