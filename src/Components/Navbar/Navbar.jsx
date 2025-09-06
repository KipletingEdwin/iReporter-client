import React from 'react'
import iReporter from '../../assets/navbar/ireporter.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <img src={iReporter} alt='iReporter' />

      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Projects</li>
        <li>Contacts</li>
      </ul>
    </div>
  )
}

export default Navbar