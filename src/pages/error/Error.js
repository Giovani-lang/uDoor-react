import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h1>404 Error</h1>
            <h1>Page Not Found</h1>
            <small>Click <NavLink to='/'>here</NavLink> !</small>
        </div>
    );
};


export default Error;