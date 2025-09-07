import React from 'react'
import './Hero.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faClock,faFile } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-details'>
        <h2>Report an Incident</h2>
        <p>Be the voice of change and report incidents in the community</p>
        <button className='hero-button'>Report Now</button>
        </div>

        <div className='works'>
            <h2>How it Works</h2>
            <div className='works-details'>

                <div className="works-sections">
                <FontAwesomeIcon icon={faUser} className='faUser' />
                    <h3>Register</h3>
                    <p>Create an account to get started</p>
                </div>

                <div className="works-sections">
                <FontAwesomeIcon icon={faFile} className='faFile' />
                    <h3>Report</h3>
                    <p>Submit a report about an incident</p>
                </div>

                <div className="works-sections">
                <FontAwesomeIcon icon={faClock}  className='faClock'/>
                    <h3>Follow Up</h3>
                    <p>Track the progess of your report </p>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Hero