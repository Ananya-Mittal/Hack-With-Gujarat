import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ItemDetail.css";
import items from "../../mockData/items.json";
import { GlobalContext } from "../../context/GlobalState";

function ItemDetail() {
  const { id } = useParams();
  const itemId = parseInt(id);
  const navigate = useNavigate();
  
  // Find the item by ID
  const item = items.find((item) => item.id === itemId);
  
  // Handle if item doesn't exist
  useEffect(() => {
    if (!item && itemId) {
      navigate("/not-found", { replace: true });
    }
  }, [item, itemId, navigate]);
  
  const { addItemToCartList, cart } = useContext(GlobalContext);
  const [selectedSize, setSelectedSize] = useState("S");
  const [isAdded, setIsAdded] = useState(
    cart.some((cartItem) => cartItem.id === itemId)
  );

  // Handle add to cart
  const handleAddToCart = () => {
    const itemWithSize = { ...item, selectedSize };
    addItemToCartList(itemWithSize);
    setIsAdded(true);
  };

  if (!item) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading item details...</p>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <Link to="/" className="back-link">
        <span className="back-arrow">&#8592;</span> Back to Shop
      </Link>
      
      <div className="item-detail">
        <div className="item-detail-image">
          <img 
            src={`/images/${item.image}`} 
            alt={item.name} 
            className="product-image"
          />
          {item.saleDiscount > 0 && (
            <span className="sale-badge">-{item.saleDiscount}% OFF</span>
          )}
        </div>
        
        <div className="item-detail-info">
          <div className="item-brand">{item.brand}</div>
          <h1 className="item-name">{item.name}</h1>
          
          <div className="item-price-rating">
            {item.saleDiscount > 0 ? (
              <div className="price-container">
                <span className="item-sale-price">
                  ${(item.price - (item.price * item.saleDiscount / 100)).toFixed(2)}
                </span>
                <span className="item-original-price">${item.price}</span>
              </div>
            ) : (
              <div className="item-price">${item.price}</div>
            )}
            
            <div className="item-rating">
              <span className="rating-value">{item.rating}</span>
              <span className="rating-star">★</span>
            </div>
          </div>
          
          <div className="item-size-selector">
            <label htmlFor="size-select">Select Size:</label>
            <select 
              id="size-select"
              className="item-size" 
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
            </select>
          </div>
          
          <button
            className={`item-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? (
              <Link to="/cart" className="cart-link">View in Cart</Link>
            ) : (
              <>Add to Bag</>
            )}
          </button>
          
          <div className="item-description">
            <h3>Product Description</h3>
            <p>
              {item.description || 
              `This premium ${item.brand} ${item.name} combines style with 
              functionality. Made with high-quality materials, this item 
              delivers exceptional comfort and durability. Perfect for 
              everyday use or special occasions, it's a versatile addition 
              to your collection.`}
            </p>
            
            <div className="item-features">
              <h3>Features</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Stylish design</li>
                <li>Comfortable fit</li>
                <li>Easy care instructions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
