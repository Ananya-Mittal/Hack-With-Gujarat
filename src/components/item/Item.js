import React from "react";

function Item({ name, rating, price, saleDiscount, image, brand }) {
  // Calculate sale price if discount is provided
  const hasSale = saleDiscount && saleDiscount > 0;
  const salePrice = hasSale ? (price - (price * saleDiscount / 100)).toFixed(2) : null;
  
  return (
    <div className="item-card">
      <div className="item-image-container">
        <img src={image} alt={`${name} product`} className="item-image" />
        {hasSale && <span className="sale-badge">-{saleDiscount}%</span>}
      </div>
      
      <div className="item-details">
        <div className="item-brand">{brand}</div>
        <div className="item-name">{name}</div>
        
        <div className="item-info">
          <div className="item-price-container">
            {hasSale ? (
              <>
                <span className="item-sale-price">${salePrice}</span>
                <span className="item-original-price">${price}</span>
              </>
            ) : (
              <span className="item-price">${price}</span>
            )}
          </div>
          
          <div className="item-rating">
            <span className="rating-stars">{rating}</span>
            <span className="star-icon">★</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
