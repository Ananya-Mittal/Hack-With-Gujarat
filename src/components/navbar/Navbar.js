import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const Navbar = () => {
  const { cart, user, isAuthenticated, logout } = useContext(GlobalContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const location = useLocation();
  
  // Check if current route is a seller route
  useEffect(() => {
    setIsSeller(location.pathname.includes('/seller'));
  }, [location]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-profile')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className={`navbar ${isSeller ? 'seller-navbar' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">ELIRA</span>
          {isSeller && <span className="seller-badge">Seller Portal</span>}
        </Link>

        <div className={`navbar-links ${showMobileMenu ? 'active' : ''}`}>
          {!isSeller ? (
            // Regular customer navbar links
            <>
              <div className="nav-item">
                <Link to="/gift-cards" className="nav-link">
                  <i className="fas fa-gift"></i>
                  <span>Gift Card</span>
                </Link>
              </div>
              
              <div className="nav-item dropdown">
                <button className="nav-link dropdown-toggle">
                  <i className="fas fa-globe"></i>
                  <span>Language</span>
                </button>
                <div className="dropdown-menu">
                  <Link to="#" className="dropdown-item">English</Link>
                  <Link to="#" className="dropdown-item">Hindi</Link>
                  <Link to="#" className="dropdown-item">Kannada</Link>
                  <Link to="#" className="dropdown-item">Marathi</Link>
                  <Link to="#" className="dropdown-item">Gujarati</Link>
                  <Link to="#" className="dropdown-item">Telugu</Link>
                </div>
              </div>
              
              <div className="nav-item">
                <Link to="/wishlist" className="nav-link">
                  <i className="fas fa-heart"></i>
                  <span>Wishlist</span>
                </Link>
              </div>

              <div className="nav-item">
                <Link to="/wishlist" className="nav-link">
                  <i className="fas fa-heart"></i>
                  <span>Digital Learning</span>
                </Link>
              </div>
              
              <div className="nav-item">
                <Link to="/app" className="nav-link">
                  <i className="fas fa-mobile-alt"></i>
                  <span>Get App</span>
                </Link>
              </div>
              
              <div className="nav-item">
                <Link to="/cart" className="nav-link cart-link">
                  <i className="fas fa-shopping-cart"></i>
                  <span>Cart ({cart.length})</span>
                  {cart.length > 0 && <span className="cart-notification"></span>}
                </Link>
              </div>
              
              <div className="nav-item">
                <Link to="/orders" className="nav-link">
                  <i className="fas fa-box"></i>
                  <span>Orders</span>
                </Link>
              </div>
            </>
          ) : (
            // Seller navbar links
            <>
              <div className="nav-item">
                <Link to="/seller/dashboard" className="nav-link">
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
              </div>
              
              <div className="nav-item">
                <Link to="/seller/products" className="nav-link">
                  <i className="fas fa-box-open"></i>
                  <span>Products</span>
                </Link>
              </div>
              
              <div className="nav-item">
                <Link to="/seller/orders" className="nav-link">
                  <i className="fas fa-shopping-bag"></i>
                  <span>Orders</span>
                </Link>
              </div>
              
              <div className="nav-item">
                <Link to="/seller/analytics" className="nav-link">
                  <i className="fas fa-chart-line"></i>
                  <span>Analytics</span>
                </Link>
              </div>
            </>
          )}
          
          <div className="nav-item user-profile" onClick={toggleDropdown}>
            <button className="nav-link profile-toggle">
              <i className="fas fa-user-circle"></i>
              <span>{isAuthenticated ? `Hi, ${user?.firstName || 'User'}` : 'Account'}</span>
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                {isAuthenticated ? (
                  // Logged in user options
                  <>
                    <div className="dropdown-user-info">
                      <i className="fas fa-user-circle dropdown-user-icon"></i>
                      <div className="dropdown-user-details">
                        <span className="dropdown-user-name">{user?.firstName} {user?.lastName}</span>
                        <span className="dropdown-user-email">{user?.email}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-user"></i> My Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-box"></i> My Orders
                    </Link>
                    {!isSeller ? (
                      <Link to="/seller/login" className="dropdown-item" onClick={closeDropdown}>
                        <i className="fas fa-store"></i> Seller Portal
                      </Link>
                    ) : (
                      <Link to="/" className="dropdown-item" onClick={closeDropdown}>
                        <i className="fas fa-shopping-bag"></i> Customer View
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </>
                ) : (
                  // Guest options
                  <>
                    <div className="dropdown-header">Welcome to ELIRA</div>
                    <div className="auth-buttons">
                      <Link to="/login" className="dropdown-auth-btn login-btn" onClick={closeDropdown}>
                        Login
                      </Link>
                      <Link to="/signup" className="dropdown-auth-btn signup-btn" onClick={closeDropdown}>
                        Sign Up
                      </Link>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/orders" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-box"></i> Track Order
                    </Link>
                    <Link to="/help" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-question-circle"></i> Help & Support
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-seller-section">
                      <span className="dropdown-seller-title">Are you a seller?</span>
                      <div className="seller-auth-links">
                        <Link to="/seller/login" className="seller-link" onClick={closeDropdown}>
                          Seller Login
                        </Link>
                        <span className="seller-divider">|</span>
                        <Link to="/seller/signup" className="seller-link" onClick={closeDropdown}>
                          Become a Seller
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;