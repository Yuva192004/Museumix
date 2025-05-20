import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // You'll need to create this CSS file

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Here you would typically make an API call to authenticate the user
    console.log('Login attempt:', formData);
    
    // For demo purposes
    // In a real app, you would verify credentials with your backend
    // and save authentication token
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/profile');
  };

  return (
    <div className="login-page">
      <div className="login-background-overlay">
        <div className="login-container">
          <h1 className="login-title">Log In to Your Account</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-button"
            >
              LOG IN
            </button>
          </form>

          <p className="signup-link">
            Don't have an account?{' '}
            <Link to="/create-account" className="signup-text">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;