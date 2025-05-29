import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Assuming you have user registration in your GlobalContext
  const { registerUser } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Mock signup functionality
    // In a real app, you would call your registerUser function from context
    console.log("Signing up with:", formData);
    
    // Simulate successful registration
    setTimeout(() => {
      // If you have a registerUser function in your context
      // registerUser({ name: formData.name, email: formData.email });
      
      // Redirect to login page after successful registration
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join us today to access exclusive features</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={errors.agreeTerms ? "checkbox-error" : ""}
            />
            <label htmlFor="agreeTerms">
              I agree to the{" "}
              <Link to="/terms" className="terms-link">
                Terms and Conditions
              </Link>
            </label>
            {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
          </div>
          
          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>
        
        <div className="social-auth">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button className="social-button google">
              <i className="fab fa-google"></i>
              Google
            </button>
            <button className="social-button facebook">
              <i className="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>
        </div>
        
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;