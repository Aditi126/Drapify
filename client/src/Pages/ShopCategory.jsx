// ShopCategory.jsx - Updated
import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext)
  const [sortOption, setSortOption] = useState("default")
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

  const getSortLabel = () => {
    switch(sortOption) {
      case "price-asc": return "Price (low to high)"
      case "price-desc": return "Price (high to low)"
      case "name-asc": return "Name A-Z"
      case "name-desc": return "Name Z-A"
      default: return "Default"
    }
  }

  return (
    <div className='shop-category'>
      
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{filteredProducts.length}</span> of {filteredProducts.length} products
        </p>
        
        <div className={`shopcategory-sort ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
          <div>{getSortLabel()} <img src={dropdown_icon} alt="dropdown" /></div>
          
          {open && (
            <div className="dropdown-menu">
              <button 
                className={sortOption === "default" ? "active" : ""}
                onClick={() => { setSortOption("default"); setOpen(false) }}
              >
                Default
              </button>
              <button 
                className={sortOption === "price-asc" ? "active" : ""}
                onClick={() => { setSortOption("price-asc"); setOpen(false) }}
              >
                Price (low to high)
              </button>
              <button 
                className={sortOption === "price-desc" ? "active" : ""}
                onClick={() => { setSortOption("price-desc"); setOpen(false) }}
              >
                Price (high to low)
              </button>
              <button 
                className={sortOption === "name-asc" ? "active" : ""}
                onClick={() => { setSortOption("name-asc"); setOpen(false) }}
              >
                Name A-Z
              </button>
              <button 
                className={sortOption === "name-desc" ? "active" : ""}
                onClick={() => { setSortOption("name-desc"); setOpen(false) }}
              >
                Name Z-A
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item 
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price} 
          />
        ))}
      </div>
      
      <div className="loadmore-container">
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      </div>
    </div>
  )
}

export default ShopCategory