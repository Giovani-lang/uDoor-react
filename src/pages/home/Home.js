import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
    return (
        <div style={{display:'flex'}}>
           <div>
           <Sidebar />
           </div>
            <div>
               <h1>
               Welcome to upowa
               </h1>
            </div>
        </div>
    );
};

export default Home;