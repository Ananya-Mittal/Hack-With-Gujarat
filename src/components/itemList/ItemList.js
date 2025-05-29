import React from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";

function ItemList({ items }) {
  // Handle empty items array
  if (!items || items.length === 0) {
    return (
      <div className="empty-items">
        <div className="empty-items-icon">📦</div>
        <h2>No items found</h2>
        <p>Try adjusting your filters or check back later for new items.</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-image-container">
              <img
                src={item.image || "/api/placeholder/300/200"}
                alt={item.name}
                className="item-image"
                loading="lazy"
              />

              <h2 className="item-title">{item.name}</h2>

              {item.saleDiscount > 0 && (
                <span className="item-badge sale">
                  {item.saleDiscount}% OFF
                </span>
              )}

              {item.saleDiscount ? (
                <>
                  <span className="item-price sale">
                    ${(item.price * (1 - item.saleDiscount / 100)).toFixed(2)}
                  </span>
                  <span className="item-price original">
                    ${item.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="item-price">${item.price.toFixed(2)}</span>
              )}

              {item.isNew && <span className="item-badge new">New</span>}
              {item.discount > 0 && (
                <span className="item-badge sale">{item.discount}% OFF</span>
              )}
            </div>

            <div className="item-details">
              <h2 className="item-title">{item.title}</h2>
              <p className="item-description">{item.description}</p>

              <div className="item-footer">
                <div className="price-container">
                  {item.discount ? (
                    <>
                      <span className="item-price sale">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                      <span className="item-price original">
                        ${item.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  )}
                </div>

                <Link to={`/item/${item.id}`} className="item-button">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
