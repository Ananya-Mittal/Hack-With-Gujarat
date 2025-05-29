import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Assuming you have user authentication in your GlobalContext
  const { loginUser } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
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
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Mock login functionality
    // In a real app, you would call your loginUser function from context
    console.log("Logging in with:", formData);
    
    // Simulate successful login
    setTimeout(() => {
      // If you have a loginUser function in your context
      // loginUser({ email: formData.email });
      
      // Redirect to home page after successful login
      navigate('/');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to access your account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-extras">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        
        <div className="social-auth">
          <p>Or login with</p>
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
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;