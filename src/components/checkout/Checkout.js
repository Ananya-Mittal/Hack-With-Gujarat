import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Checkout.css";

const Checkout = () => {
  const { cart, orders, addItemToOrderList, clearCart } = useContext(GlobalContext);
  
  // Constants for the calculation
  const discount = 20; // 20%
  const extraFees = 99;
  const tax = 5;
  
  // Calculate all values
  const subTotal = cart?.reduce((sum, curr) => sum + curr.price, 0) || 0;
  const discountAmount = ((subTotal + extraFees + tax) * (discount / 100));
  const total = Math.floor(subTotal + extraFees + tax - discountAmount);
  
  const [isOrdered, setIsOrdered] = useState(false);
  
  const handlePay = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      orderId: orders.length + 1,
      buyerId: 1,
      items: [...cart],
      price: total,
      address: "7 Rusk Court",
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      isDelivered: false,
    };
    
    addItemToOrderList(newOrder);
    clearCart();
    setIsOrdered(true);
  };
  
  return (
    <div className="checkout-container">
      {isOrdered ? (
        <div className="order-success">
          <div className="success-icon">🚀</div>
          <h2>Order placed successfully!</h2>
          <p>Your items are on their way.</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="checkout-header">
            <h2>Checkout</h2>
          </div>
          
          <div className="checkout-section">
            <div className="section-header">
              <h3>Order Review</h3>
              <span className="item-count">{cart?.length} items in cart</span>
            </div>
            {cart.length > 0 ? (
              <div className="cart-preview">
                {cart.slice(0, 2).map((item, index) => (
                  <div key={index} className="cart-preview-item">
                    <div className="preview-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="preview-item-details">
                      <span className="preview-item-name">{item.name}</span>
                      <span className="preview-item-price">${item.price}</span>
                    </div>
                  </div>
                ))}
                {cart.length > 2 && (
                  <div className="more-items">
                    +{cart.length - 2} more items
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-cart-message">
                Your cart is empty. <Link to="/">Add some items</Link>
              </div>
            )}
          </div>
          
          <div className="checkout-section">
            <div className="section-header">
              <h3>Coupons</h3>
              <span className="coupon-status">Not Available</span>
            </div>
          </div>
          
          <div className="checkout-section">
            <div className="section-header">
              <h3>Checkout Summary</h3>
            </div>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)} ({discount}%)</span>
              </div>
              <div className="summary-row">
                <span>Extra Fee</span>
                <span>${extraFees.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button 
            className={`checkout-btn ${cart.length === 0 ? 'disabled' : ''}`} 
            onClick={handlePay}
            disabled={cart.length === 0}
          >
            {cart.length === 0 ? 'Cart is Empty' : `Pay $${total.toFixed(2)}`}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;