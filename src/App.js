import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Signing from './pages/signin/Signing';
import Navigation from './components/signin/Navigation';
import Signup from './pages/signup/Signup';
import './App.css';
import Home from './pages/home/Home';
import User from './pages/user/User';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signing />} />
        <Route path='/signin' element={<Navigation />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/user' element={<User/>} />
        {/* <Route path='*' element={<Signin/>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;








