import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import User from '../../pages/user/User';
import Signing from '../../pages/signin/Signing';
import Signup from '../../pages/signup/Signup';





const Content = () => {
    return (
        <div>
            <Routes>

                <Route path='/user' element={<User />} />
                <Route path='*' element={<Home />} />
                <Route path='/Signin' element={<Signing />} />
                <Route path='/Signup' element={<Signup />} />
            </Routes>
        </div>
    );
};

export default Content;