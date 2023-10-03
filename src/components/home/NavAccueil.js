import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAccueil = () => {
    return (
        <div>
           <NavLink to ="/home"/>
            <h1>BIENVENUE A MA PAGE</h1>  
        </div>
    );
};

export default NavAccueil;