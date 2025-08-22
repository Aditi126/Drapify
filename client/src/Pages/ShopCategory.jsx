import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext)
  const [sortOption, setSortOption] = useState()
  const [open, setOpen] = useState(false)

  let filteredProducts = all_products.filter(
    (item) => props.category === item.category
  )


  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.new_price - b.new_price)
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.new_price - a.new_price)
  } else if (sortOption === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortOption === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 26 products
        </p>
        <div className="shopcategory-sort" onClick={() => setOpen(!open)}>
          <div>Sort by <img src={dropdown_icon} alt="" /></div>
          <div>
            {
              open && (
                <div className="dropdown-menu" >
                  <button onClick={() => { setSortOption("default"); setOpen(!open) }}>Default</button>
                  <button onClick={() => { setSortOption("price-asc"); setOpen(!open) }}>Price (low to high)</button>
                  <button onClick={() => { setSortOption("price-desc"); setOpen(!open) }}>Price (high to low)</button>
                  <button onClick={() => { setSortOption("name-asc"); setOpen(!open) }}>Name A-Z</button>
                  <button onClick={() => { setSortOption("name-desc"); setOpen(!open) }}>Name Z-A</button>
                </div>)
            }
          </div>
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
