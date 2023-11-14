import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { ArrowDownOutlined, ArrowUpOutlined ,TeamOutlined} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Calendar, Radio, Select, Typography, theme } from 'antd';
import { Area, Pie } from '@ant-design/plots';
import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import axios from 'axios';
import User from '../user/User';


dayjs.extend(dayLocaleData);
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};


const Home = () => {
  const [utilisateurs, setUtilisateurs] = useState();
  var [userActif, setUserActif] = useState(0);
  const history = useNavigate();
  const [nbUserAc, setNbuserAc] = useState(null);
  const [userInactif, setUserInactif] = useState(null);

  useEffect(() => {
    let email = sessionStorage.getItem('email');
    if (email === '' || email === null) {
      history('/Signin')
    }
  }, []);

  useEffect(() => {
    // Récupération des données du serveur
    axios.get("https://test-back.authentify.upowa.org/api/user/all?page=2&size=10000")
        .then((response) => {
        console.log(response.data)
        //Nombre d'utilisateurs 
        setUtilisateurs(response.data.totalElements)
        console.log(utilisateurs)
        //Nombre d'utilisateurs Actifs
        userActif = response.data.content.filter(utilisateur => utilisateur.statut === "Actif");
        setNbuserAc(userActif.length)
        console.log(nbUserAc)
        //Nombre d'utilisateurs Inactifs
        // const UserInactif = utilisateurs-nbUserAc;
        const userInactif = response.data.content.filter(utilisateur => utilisateur.statut === "Inactif");
        setUserInactif(userInactif.length)
        console.log(userInactif)   
      });
  }, []);

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  //Graphe de données
  const data = [
   
    {
      type: 'Active users',
      value: nbUserAc
    },
    {
      type: 'Inactive Users',      
      value:userInactif,     
      
    },
    
       
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };


  
  
  return (
    <div style={{ backgroundColor: '#e5e9ed',fontWeight:'bold',  margin: '0px', width: '1250px', marginTop: '-12px' }} >
      {/* // statistiques */}
      <div className='stats'>
        <Row gutter={10}  >
          <Col style={{ margin: '50px', marginTop: '50px' }} span={1000} >
            <Card bordered={false} style={{ width: '300px', height: '200px', backgroundColor: '#6cb0e7' }}>
              <Statistic
                title="Number of users" 
                value={utilisateurs}
                
                valueStyle={{
                  color: '#3f8600',
                }}
                prefix=''
                suffix={<TeamOutlined style={{marginLeft:150, marginTop:50}}/>}
              />
            </Card>
          </Col>
          <Col style={{ margin: '50px', marginTop: '50px' }} span={1000} >
            <Card bordered={false} style={{ width: '300px', height: '200px', backgroundColor: '#6cb0e7' }}>
              <Statistic
                title="Number of active users"
                value={nbUserAc}
                valueStyle={{
                  color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
                suffix={<TeamOutlined style={{marginLeft:150, marginTop:50}}/>}
              />
            </Card>
          </Col>
          <Col style={{ margin: '50px', marginTop: '50px' }} span={1000}>
            <Card bordered={false} style={{ width: '300px', height: '200px', backgroundColor: '#6cb0e7' }}>
              <Statistic
                title="Number of inactive users"
                value={userInactif}
                valueStyle={{
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix={<TeamOutlined style={{marginLeft:150, marginTop:50, color:'red'}} />}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'-5px' }}>
        {/* Graphe */}
        <div style={{marginRight:20, marginLeft: 30,marginTop: '-140px', width: 600, height: 600}} >
          {<Pie {...config} />}
        </div>
        {/* calendrier */}
        <div style={{ width: '500px', marginLeft: '9px', marginTop: '5px' }}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
      </div>


    </div >
  );

};

export default Home;