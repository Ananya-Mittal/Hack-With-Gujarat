import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Cart.css";

function Cart() {
  const { cart, removeItemFromCartList, updateCartItemQuantity } = useContext(GlobalContext);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const discountRate = 0.1; // 10% discount
  
  // Calculate cart total
  const itemsTotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  
  // Apply discount if coupon is applied
  const discount = couponApplied ? itemsTotal * discountRate : 0;
  const cartTotal = itemsTotal - discount;
  
  // Calculate shipping cost (free if over $100)
  const shippingCost = itemsTotal > 100 ? 0 : 5.99;
  
  // Calculate tax (assuming 8%)
  const estimatedTax = cartTotal * 0.08;
  
  // Final total
  const finalTotal = cartTotal + shippingCost + estimatedTax;
  
  // Calculate estimated delivery date (3-6 business days from today)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const minDays = new Date(today);
    const maxDays = new Date(today);
    
    // Add business days (excluding weekends)
    let minAdded = 0;
    let maxAdded = 0;
    
    while (minAdded < 3) {
      minDays.setDate(minDays.getDate() + 1);
      if (minDays.getDay() !== 0 && minDays.getDay() !== 6) {
        minAdded++;
      }
    }
    
    while (maxAdded < 6) {
      maxDays.setDate(maxDays.getDate() + 1);
      if (maxDays.getDay() !== 0 && maxDays.getDay() !== 6) {
        maxAdded++;
      }
    }
    
    // Format dates
    const options = { month: 'short', day: 'numeric' };
    return `${minDays.toLocaleDateString('en-US', options)} - ${maxDays.toLocaleDateString('en-US', options)}`;
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  // Handle coupon application
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try 'SAVE10' for 10% off.");
    }
  };

  // Get total number of items in cart
  const totalItems = cart.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <span className="cart-count">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      {!cart.length ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p className="empty-title">Your cart is empty</p>
          <p className="empty-cart-message">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">
                      <span>{item.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                <div className="cart-item-details">
                  <h3 className="item-name">
                    <Link to={`/item/${item.id}`}>{item.name}</Link>
                  </h3>
                  <div className="item-brand">{item.brand}</div>
                  <div className="item-delivery">
                    <span className="delivery-label">Expected delivery:</span> {getEstimatedDelivery()}
                  </div>
                </div>
                
                <div className="cart-item-quantity">
                  <label htmlFor={`quantity-${item.id}`} className="quantity-label">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-actions">
                  <div className="item-price">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </div>
                  <div className="item-unit-price">
                    (${(item.price || 0).toFixed(2)} each)
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItemFromCartList(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Items Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>
            
            {couponApplied && (
              <div className="summary-row discount">
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="summary-row">
              <span>Shipping</span>
              {itemsTotal > 100 ? (
                <span className="free-shipping-text">FREE</span>
              ) : (
                <span>${shippingCost.toFixed(2)}</span>
              )}
            </div>
            
            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>
            
            <div className="coupon-section">
              <div className="coupon-input-group">
                <input
                  type="text"
                  className="coupon-input"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                <button 
                  className="apply-coupon-btn"
                  onClick={applyCoupon}
                  disabled={couponApplied}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {couponApplied && (
                <div className="coupon-applied-message">
                  Coupon SAVE10 applied successfully!
                </div>
              )}
            </div>
            
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Order Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            
            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
            
            <div className="cart-policies">
              <p className="secure-checkout">
                <span className="secure-icon">🔒</span> Secure Checkout
              </p>
              <p className="cart-policy-text">
                Free returns within 30 days • Satisfaction guaranteed
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;