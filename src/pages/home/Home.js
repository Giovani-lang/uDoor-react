import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Calendar, Radio, Select, Typography, theme } from 'antd';
import { Area } from '@ant-design/plots';
import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { } from 'antd';
import axios from 'axios';
import User from '../user/User';
dayjs.extend(dayLocaleData);

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};


const Home = () => {
  const [utilisateurs, setUtilisateurs] = useState([Number]);
  var [userActif, setUserActif] = useState(0);
  const history = useNavigate();
  const [nbUserAc, setNbuserAc] = useState([Number]);
  const [userInactif, setUserInactif] = useState([Number]);

  useEffect(() => {
    let email = sessionStorage.getItem('email');
    if (email === '' || email === null) {
      history('/Signin')
    }
  }, []);

  useEffect(() => {
    // Récupération des données du serveur
    axios.get("https://test-back.authentify.upowa.org/api/user/all?page=2&size=10000")
      // .then((response) => response.json())
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



  // useEffect(() => {
  //   // Récupération des données du serveur
  //   axios.get("https://test-back.authentify.upowa.org/api/user/all?page=2&size=10000")
  //     // .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response.data)
  //       response.data.content.forEach(email=>utilisateurs++) 
  //      console.log(utilisateurs)
  //     });
  // }, []);



  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };


  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  };
  return (
    <div style={{ backgroundColor: '#e5e9ed', margin: '0px', width: '1250px', marginTop: '-12px' }} >
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
                prefix={<ArrowUpOutlined />}
                suffix=""
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
                suffix=""
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
               
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'-5px' }}>
        {/* Graphe */}
        <div >
          <Area style={{ margin: '70px', marginLeft: '0px', height: '300px', width: '600px', marginTop: '26px' }} {...config} passive={true} />;
        </div>
        {/* calendrier */}
        <div style={{ width: '500px', marginLeft: '9px', marginTop: '20px' }}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
      </div>


    </div >
  );

};

export default Home;