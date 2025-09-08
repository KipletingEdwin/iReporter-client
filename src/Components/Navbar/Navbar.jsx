import React from 'react'
import iReporter from '../../assets/navbar/iReporter.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <img src={iReporter} alt='iReporter' />
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/about'>About</a></li>
        <li><a href='/contact'>Contact</a></li>
      </ul>
    </div>
  )
}

export default Navbar