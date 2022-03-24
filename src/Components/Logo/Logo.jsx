import React from 'react';
import './Logo.css';
import logo from './../../Assets/Images/logo.png' // relative path to image 

export default function Logo() {
    console.log(logo)
    return (
      <div className="Logo">
          <img src={logo} alt="logo" />
      </div>
    );
}