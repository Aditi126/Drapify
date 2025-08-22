import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>E-commerce, short for electronic commerce, 
                    refers to the buying and selling of products or services through the internet. 
                    This encompasses a wide range of activities, including online shopping, 
                    electronic payments, online auctions, and internet banking. 
                    E-commerce can occur on various platforms, such as dedicated websites, 
                    mobile apps, social media, and online marketplaces</p>
                <p>eCommerce is the process of conducting commercial transactions online. 
                    This includes a wide range of activities such as buying and selling products, 
                    processing payments, and managing logistics</p>
            </div>
        </div>
    )
}

export default DescriptionBox
