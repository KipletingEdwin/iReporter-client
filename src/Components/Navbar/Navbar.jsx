import React from 'react'
import iReporter from '../../assets/navbar/iReporter.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <img src={iReporter} alt='iReporter' />

      <ul>
        <li><a href='/'></a>Home</li>
        <li><a href='/'></a>About</li>
        <li><a href='/'></a>Contact</li>
      </ul>
    </div>
  )
}

export default Navbar