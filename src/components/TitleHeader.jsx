import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const App = () => (
  <Card
    style={{
      color: 'white',
      backgroundColor: '#272727',
      border: 'none',
      width: '100%',
      height: '60px',
      borderRadius: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
<h1 style={{ fontSize: '24px' }}>AxoScan</h1>
    <Link id='link' to='/home'>Home</Link>
  </Card>
);
export default App;
