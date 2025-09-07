
import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { Link } from 'react-router-dom'

const CartItems = () => {
    const { getTotalCartAmount, all_products, cartItems, removeFromCart, addToCart, decreaseFromCart } = useContext(ShopContext);
    
    // Check if cart is empty
    const isCartEmpty = Object.values(cartItems).every(item => item === 0);
    
    if (isCartEmpty) {
        return (
            <div className='cartitems'>
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <Link to="/" className="continue-shopping">Continue Shopping</Link>
                </div>
            </div>
        )
    }
    
    return (
        <div className='cartitems'>
            <div className="cartitems-header">
                <h1>Shopping Cart</h1>
            </div>
            
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            
            <hr />
            
            {all_products.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <Link to={`/product/${e.id}`}>
                                    <img src={e.image} alt={e.name} className="cartitem-product-icon" />
                                </Link>
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <div className="cartitems-quantity">
                                    <button onClick={() => removeFromCart(e.id)}>-</button>
                                    <span>{cartItems[e.id]}</span>
                                    <button onClick={() => addToCart(e.id)}>+</button>
                                </div>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="Remove" />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}
            
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <div className="cartitems-total-item">
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount().toFixed(2)}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo code' />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems