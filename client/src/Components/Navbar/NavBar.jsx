import React, { useContext, useRef } from 'react'
import './NavBar.css'
import { useState } from 'react'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, replace } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/dropdown_icon.png'
import nav_dropdown_icon from '../Assets/nav_dropdown.png'
const NavBar = () => {
    const {getTotalCartItems} = useContext(ShopContext);
    const [menu, setMenu] = useState("shop");
    const menuRef = useRef();
    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }
    return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Drapify.com</p>
      </div>
      <img className='nav-dropdown' src={nav_dropdown_icon} alt="" onClick={dropdown_toggle}/>
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration: "none", color: "#626262"}} to={'/'}>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("men")}}> <Link  style={{textDecoration: "none", color: "#626262"}}to={'/men'}>Men</Link>  {menu==="men"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("women")}}> <Link style={{textDecoration: "none", color: "#626262"}} to={'/women'}>Women</Link>  {menu==="women"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}> <Link style={{textDecoration: "none", color: "#626262"}} to={'/kids'}>Kid</Link>  {menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        
        {localStorage.getItem('auth-token')? 
        <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button> : 
        <Link style={{textDecoration: "none"}} to={'/login'}><button>Login</button></Link>}
        
        <Link style={{textDecoration: "none"}} to={'/cart'}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default NavBar
