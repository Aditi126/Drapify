import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import arrow_icon from '../Assets/arrow.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BESTSELLER PRODUCTS</p>
        <div className="offers-button">
            <div>Check Now</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
