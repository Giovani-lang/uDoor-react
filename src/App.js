import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

// import Signin from './pages/signin/Signin';
import Signing from './pages/signin/Signing';
import Navigation from './components/signin/Navigation';
import NavAccueil from './components/home/NavAccueil';
import Signup from './pages/signup/Signup';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signing />} />
        <Route path='/signin' element={<Navigation />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<NavAccueil />} />
        {/* <Route path='*' element={<Signin/>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;








