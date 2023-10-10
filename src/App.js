import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Content from './components/content/Content';
import Sidebar from './components/sidebar/Sidebar';
import Head from './components/Head/Head'
import SignOut from './components/home/SignOut';

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








