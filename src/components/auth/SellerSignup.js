import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Auth.css";

function SellerSignup() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    businessType: "individual",
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { registerSeller } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      nextStep();
      return;
    }
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Here you would call your API to register the seller
      await registerSeller(formData);
      
      // Redirect to seller dashboard or confirmation page
      navigate("/seller/verification");
    } catch (err) {
      setErrors({
        ...errors,
        form: err.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container seller-auth">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h1>Become a Seller</h1>
          <p>Start selling your products to millions of customers</p>
          
          <div className="step-indicator">
            <div className={`step ${currentStep === 1 ? "active" : ""}`}>
              <span className="step-number">1</span>
              <span className="step-name">Account</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep === 2 ? "active" : ""}`}>
              <span className="step-number">2</span>
              <span className="step-name">Details</span>
            </div>
          </div>
        </div>
        
        {errors.form && (
          <div className="auth-error-message">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {currentStep === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="businessName">Business/Store Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={errors.businessName ? "input-error" : ""}
                />
                {errors.businessName && <div className="error-text">{errors.businessName}</div>}
              </div>
              
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
                <div className="password-requirements">
                  Password must be at least 8 characters
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                {errors.confirmPassword && (
                  <div className="error-text">{errors.confirmPassword}</div>
                )}
              </div>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "input-error" : ""}
                  />
                  {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                </div>
                
                <div className="form-group half">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "input-error" : ""}
                  />
                  {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(xxx) xxx-xxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && <div className="error-text">{errors.phone}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="businessType">Business Type</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option value="individual">Individual/Sole Proprietor</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className={errors.acceptTerms ? "checkbox-error" : ""}
                />
                <label htmlFor="acceptTerms">
                  I agree to the <Link to="/terms">Terms and Conditions</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>
                </label>
                {errors.acceptTerms && (
                  <div className="error-text">{errors.acceptTerms}</div>
                )}
              </div>
            </>
          )}
          
          <div className="auth-button-group">
            {currentStep === 2 && (
              <button 
                type="button" 
                className="auth-button secondary"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            
            <button 
              type={currentStep === 2 ? "submit" : "button"}
              className="auth-button seller-auth-button"
              onClick={currentStep === 1 ? nextStep : undefined}
              disabled={isLoading}
            >
              {currentStep === 1 ? "Next" : isLoading ? "Creating Account..." : "Create Seller Account"}
            </button>
          </div>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have a seller account?{" "}
            <Link to="/seller/login" className="auth-redirect-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      
      <div className="auth-benefits">
        <h2>Seller Benefits</h2>
        <ul>
          <li>
            <span className="benefit-icon">🌐</span>
            <span className="benefit-text">Expand your business online</span>
          </li>
          <li>
            <span className="benefit-icon">📱</span>
            <span className="benefit-text">Manage your store anywhere, anytime</span>
          </li>
          <li>
            <span className="benefit-icon">💳</span>
            <span className="benefit-text">Secure payment processing</span>
          </li>
          <li>
            <span className="benefit-icon">📈</span>
            <span className="benefit-text">Growth tools and marketing support</span>
          </li>
        </ul>
        
        <div className="seller-testimonial">
          <blockquote>
            "Joining as a seller was the best business decision I made. Sales increased by 200% in just 3 months!"
          </blockquote>
          <cite>— Sarah K., Fashion Boutique Owner</cite>
        </div>
      </div>
    </div>
  );
}

export default SellerSignup;