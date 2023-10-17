import React from 'react';

import {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
const Error = () => {
            
            const [message, setMessage] = useState("Page non trouvée");

    // const history = useNavigate();
   

            return (
            <div>
                
                <h1>Erreur 404</h1>
                <p>{message}</p>
            </div>
            );
        
    
};

export default () => (
   <Routes><Route path="*" element={<Error />} /></Routes> 
  );