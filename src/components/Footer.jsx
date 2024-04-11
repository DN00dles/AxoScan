import React from 'react';
import { Card } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import '../styles/Footer.css';
import sofiaPic from '../assets/sofia.png';
import joPic from '../assets/jo.png';
import tedPic from '../assets/ted.png';
import jessePic from '../assets/jesse.png';
import zackPic from '../assets/zack.png';

export default function Footer() {
  console.log('link: ', sofiaPic)
  const names = ['Sofia', 'Joseph', 'Zack', 'Jesse', 'Ted'];
  const urls = [
    'https://github.com/sarhiri',
    'https://github.com/joeahn95',
    'https://github.com/ZackVandiver',
    'https://github.com/JesseWowczuk',
    'https://github.com/TedPham397'
  ];
  const images = [
    sofiaPic,
    joPic, 
    zackPic,
    jessePic,
    tedPic
  ]
  const res = [];

  for (let i = 0; i < names.length; i++) {
    res.push(<Box key={crypto.randomUUID()} name={names[i]} url={urls[i]} images={images[i]} />);
  }
  return (
    <div id="footer">
      <h2>DNOOdles</h2>
      <h4>Design Team:</h4>
      {res}
    </div>
  );
}

const Box = ({ name, url, images }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <img src={images} alt={name} style={{ width: '60px', height: '60px', borderRadius: '0%', marginRight: '10px' }} /> */}
      <p style={{ marginRight: '10px' }}>{name} </p>
      <a href={url}>
        {/* <GithubOutlined style={{ color: 'white', fontSize: '24px' }} /> */}
        <img src={images} alt={name} style={{ width: '60px', height: '60px', borderRadius: '0%', marginRight: '10px' }} />
      </a>
    </div>
  );
};
