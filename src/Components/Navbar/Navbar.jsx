import React from 'react'
import iReporter from '../../assets/navbar/iReporter.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <img src={iReporter} alt='iReporter' />

      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  )
}

export default Navbar