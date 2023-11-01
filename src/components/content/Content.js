import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import User from '../../pages/user/User';
import Signing from '../../pages/signin/Signing';
import Signup from '../../pages/signup/Signup';
import Error from '../../pages/error/Error.js'





const Content = () => {
    return (
        <div style={{ zIndex: 0, marginLeft: 230, marginTop: 60 }}>
            <Routes>
                <Route path='*' element={<Error />} />
                <Route path='/user' element={<User />} />
                <Route path='/' element={<Home />} />
                <Route path='/Signin' element={<Signing />} />
                <Route path='/Signup' element={<Signup />} />
            </Routes>
        </div>
    );
};

export default Content;