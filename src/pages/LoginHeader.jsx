import React from 'react'
import '../index.css'  
import axolotl from '../assets/collab.png';

export default function LoginHeader() {
  return (
      <div className='l-header'>
        <img className="header-img" src={axolotl} alt="axolotl eating ramen" />
      <h1>AxoGroup X DNOOdles</h1>
      </div>
  
  )
}
 