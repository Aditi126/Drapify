import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  // Calculate discount percentage if old price exists and is higher than new price
  const calculateDiscount = () => {
    if (props.old_price && props.old_price > props.new_price) {
      const discount = Math.round(((props.old_price - props.new_price) / props.old_price) * 100);
      return <span className="discount-badge">-{discount}%</span>;
    }
    return null;
  };

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}> 
        <img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} /> 
      </Link> 
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        {props.old_price && props.old_price > props.new_price && (
          <div className="item-price-old">${props.old_price}</div>
        )}
        {calculateDiscount()}
      </div>
    </div>
  )
}

export default Item