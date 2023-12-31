import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import User from '../../pages/user/User';
import Signing from '../../pages/signin/Signing';
import Signup from '../../pages/signup/Signup';
import Error from '../../pages/error/Error.js';
import Profil from '../../pages/profil/Profil.js';






const Content = () => {

    return (
        <div style={{ 
            zIndex: 5, 
            position: 'fixed', 
            marginLeft: 240, 
            marginTop: 57 ,
            flexDirection: 'column',
            '@media (max-width: 768px)': {
              flexDirection: 'row',
            },
    
            
        }}>

            <Routes>
                <Route path='*' element={<Error />} />
                <Route path='/user' element={<User />} />
                <Route path='/' element={<Home />} />
                <Route path='/Signin' element={<Signing />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='/Profil' element={<Profil />} />
            </Routes>
        </div>
    );
};

export default Content;