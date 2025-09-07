import React from 'react'
import './Hero.css'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-content">
        <div className="hero-left">
          <h2>New Arrivals Only</h2>
          <h1>Fashion for <span>Everyone</span></h1>
          <p>
            Discover the latest trends and express your unique style with our new collection. 
            Quality clothing designed for everyday life and special occasions.
          </p>
          
          <div className="hero-cta">
            <button className="cta-primary">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">New Arrivals</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Brands</span>
            </div>
          </div>
        </div>
        
        <div className="hero-right">
          <img src={hero_image} alt="Fashion Model" className="hero-image" />
        </div>
      </div>
    </div>
  )
}

export default Hero