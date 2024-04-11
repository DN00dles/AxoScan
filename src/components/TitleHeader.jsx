import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import '../index.css' 
import axolotl from '../assets/collab.png';

const App = () => (
  <>
  <Card className="header-card">
      <img className="header-img" src={axolotl} alt="axolotl eating ramen" />
    <h1>DNOOdles X AxoScan</h1>
    
  </Card>
  <div className='link-div'>
    <Link id='link' to='/home'>Home</Link>
    <Link id='link' to='/profile'>Profile</Link>
  </div>
  </>
);
export default App;
