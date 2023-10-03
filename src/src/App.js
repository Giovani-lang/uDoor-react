import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

// import Signin from './pages/signin/Signin';
import Signing from './pages/signin/Signing';
import Navigation from './components/signin/Navigation';
import NavAccueil from './components/home/NavAccueil';
import Navsignup from './components/signup/Navsignup';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signing/>}/>
        <Route path='/signin' element={<Navigation/>}/>
        <Route path='/signup' element={<Navsignup/>}/>    
        <Route path='/home' element={<NavAccueil/>}/> 
        {/* <Route path='*' element={<Signin/>}/> */}
      </Routes>  
    </BrowserRouter>
  );
};

export default App;







  
