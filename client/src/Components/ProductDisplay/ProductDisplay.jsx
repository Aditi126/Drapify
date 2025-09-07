import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('M');
    const [mainImage, setMainImage] = useState(product.image);
    
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    
    const calculateDiscount = () => {
        if (!product.old_price || product.old_price <= product.new_price) return null;
        const discount = Math.round(((product.old_price - product.new_price) / product.old_price) * 100);
        return <span className="discount-badge">-{discount}%</span>;
    };
    
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" onClick={() => setMainImage(product.image)} />
                    <img src={product.image} alt="" onClick={() => setMainImage(product.image)} />
                    <img src={product.image} alt="" onClick={() => setMainImage(product.image)} />
                    <img src={product.image} alt="" onClick={() => setMainImage(product.image)} />
                </div>
                <div className="productdisplay-main-img">
                    <img src={mainImage} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_dull_icon} alt="star" />
                    <p>(122 reviews)</p>
                </div>
                
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                    {product.old_price && product.old_price > product.new_price && (
                        <div className="productdisplay-right-price-old">${product.old_price}</div>
                    )}
                    {calculateDiscount()}
                </div>
                
                <div className="productdisplay-right-description">
                    {product.description || "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment."}
                </div>
                
                <div className="productdisplay-right-size">
                    <h1>Select size <span className="size-guide">Size guide</span></h1>
                    <div className="productdisplay-right-sizes">
                        {sizes.map((size) => (
                            <div 
                                key={size}
                                className={selectedSize === size ? 'selected' : ''}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                
                <button onClick={() => { addToCart(product.id) }}>
                    ADD TO CART
                </button>
                
                <p className="productdisplay-right-category">
                    <span>Category: </span> Women, T-shirt, Crop Top
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags: </span> Modern, Latest
                </p>
            </div>
        </div>
    )
}

export default ProductDisplay