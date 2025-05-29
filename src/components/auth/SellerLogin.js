import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Auth.css";

function SellerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { loginSeller } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Here you would call your API to authenticate the seller
      await loginSeller(formData);
      
      // Redirect to seller dashboard on successful login
      navigate("/seller/dashboard");
    } catch (err) {
      setErrors({
        ...errors,
        form: err.message || "Login failed. Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container seller-auth">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Seller Login</h1>
          <p>Access your seller account to manage products and orders</p>
        </div>
        
        {errors.form && (
          <div className="auth-error-message">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>
          
          <div className="form-group remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/seller/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="auth-button seller-auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have a seller account?{" "}
            <Link to="/seller/signup" className="auth-redirect-link">
              Sign Up
            </Link>
          </p>
        </div>
        
        <div className="auth-info">
          <p>Need help? Contact seller support at <a href="mailto:seller-support@example.com">seller-support@example.com</a></p>
        </div>
      </div>
      
      <div className="auth-benefits">
        <h2>Why Sell With Us?</h2>
        <ul>
          <li>
            <span className="benefit-icon">💰</span>
            <span className="benefit-text">Access to millions of customers</span>
          </li>
          <li>
            <span className="benefit-icon">🚚</span>
            <span className="benefit-text">Easy shipping and fulfillment options</span>
          </li>
          <li>
            <span className="benefit-icon">📊</span>
            <span className="benefit-text">Powerful analytics and reporting</span>
          </li>
          <li>
            <span className="benefit-icon">💻</span>
            <span className="benefit-text">User-friendly seller dashboard</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SellerLogin;