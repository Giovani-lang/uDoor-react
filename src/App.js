import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Content from './components/content/Content';
import Sidebar from './components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Error from '../src/pages/Error/Error'

const App = () => {



  return (

    <BrowserRouter>
      
      <div style={{ display: 'flex' }}>
        <div>
          <Sidebar />
        </div>
        <div>
          <Content />


        </div>

      </div>
    </BrowserRouter>
  );
};


export default App;








