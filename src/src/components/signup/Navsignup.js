import React from 'react';
import { NavLink } from 'react-router-dom';


const Navsignup = () => {
    return (
        <div >
            <ul>
                <NavLink to ="/">
                    <li>Log In</li>
                </NavLink>
               
            </ul>
            
        </div>
    );
};

export default Navsignup;