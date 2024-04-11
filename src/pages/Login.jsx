import React, { useEffect, useState } from 'react';
import ReceiptList from '../components/ReceiptList';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword } from '../slices/receiptSlice.js';
import TitleHeader from '../components/TitleHeader.jsx';
import Footer from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';

import LoginHeader from './LoginHeader.jsx';


export default function Login() {
  const navigate = useNavigate()
  const {username, password} = useSelector(state => state.receipt);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
    
        const data = await response.json();
        
        if (data.login === 'success') {
            navigate('/home');
        } else {
            alert('login failed!');
        }
    }
    catch (err) {
        console.log(err)
    }

  }

  return (
    <>
    <div className='loginBody'>
      <LoginHeader className='loginHeader'/>
        <div className="profile-cont">
            <h1 className='logTitle'>LOGIN</h1>
        
            <h2>Have an account?</h2>
            <div className='loginContent'>
              <h3>Username:</h3>
              <input type="text" id='username' value={username} onChange={(e) => dispatch(setUsername(e.target.value))}/>
              <h3>Password:</h3>
              <input type="text" id='password' value={password} onChange={(e) => dispatch(setPassword(e.target.value))}/>
              <br />
              <button className ="loginButton" onClick={handleClick}>Login</button>
              </div>
        </div>
      </div>
    </>
  );
}
