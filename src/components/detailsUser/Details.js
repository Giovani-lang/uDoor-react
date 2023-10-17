import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const {email}=useParams()
  const [data, setData]=useState([])

  useEffect(()=>{
    axios.get(`https://test-back.authentify.upowa.org/api/user/detail?email=${email}`)
    .then(resp =>{
      console.log(resp)
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div>
      
    </div>
  );
};

export default Details;






// import React from 'react';
// import { useContext, useEffect, useState, createContext } from "react";
// import { Descriptions } from 'antd';
// import axios from "axios";
// import { Modal } from 'antd';

// const Details = ({open,onCancel, email}) => {   
    
//     console.log(email);
//     const [data, setData] = useState([])

//     useEffect(() => {
//       handleData();
//     }, [email]);

//     const handleData = () => {
//       axios
//         .get('https://test-back.authentify.upowa.org/api/user/detail?email=' + email)
//         .then((resp) => {
//           console.log(resp)
//           setData(resp.data);
//         });
//     };
  
    
   

    
    
     
      
//     return (
//       <>
//       <Modal open={open} footer={null} onCancel={onCancel} >
//         <Descriptions layout="vertical" title="Details du user">
//           <Descriptions.Item label="Firstname">{data.firstname}</Descriptions.Item>
//           <Descriptions.Item label="Lastname">{data.lastname}</Descriptions.Item>
//           <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
//           <Descriptions.Item label="Statut">{data.statut}</Descriptions.Item>
//           <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
//           <Descriptions.Item label="Statut">{data.statut}</Descriptions.Item>
//           <Descriptions.Item label="Photo">{data.image_url}</Descriptions.Item>
//         </Descriptions>
//       </Modal>
//     </>
//     );
// };



// export default Details;