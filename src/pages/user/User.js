import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';

const User = () => {
    return (
        <div style={{display:'flex'}}>
            <div>
            <Sidebar />
            </div>
        <div>
        <h1>
            List users
        </h1>
        </div>
        </div>
    );
};

export default User;