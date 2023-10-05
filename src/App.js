import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';




import './App.css';
import Content from './components/content/Content';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  const [isConnect, setIsConnect] = useState(false);

useEffect (() =>{
  if(isConnect ){    
   window.location = '/Signin'; 
   
  } else if(setIsConnect === true ){
    window.location = '/';
  }
})

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








