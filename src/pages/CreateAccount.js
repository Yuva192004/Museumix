import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/CreateAccount.css';
import axios from 'axios';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Backend URL - change this to match your backend port
  const API_BASE_URL = 'http://localhost:3000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Check for empty fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to register with:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        // Don't log password
      });

      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      console.log('Registration successful:', res.data);
      
      // Store token if you want to auto-login the user
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      alert(res.data.msg || 'Account created successfully! Please log in.');
      navigate('/login');
      
    } catch (err) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Account creation failed.';
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.msg || 
                      `Server error: ${err.response.status} ${err.response.statusText}`;
        console.error('Server error response:', err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check if the backend is running.';
        console.error('Network error:', err.request);
      } else {
        // Something else happened
        errorMessage = err.message;
        console.error('Error:', err.message);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-page">
      <div className="account-background-overlay">
        <div className="create-account-container">
          <h1 className="account-title">Create Your Account</h1>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="account-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  disabled={loading}
                />
              </div>
            </div>

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
                disabled={loading}
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
                placeholder="Minimum 6 characters"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary account-button"
              disabled={loading}
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="login-link">
            Already have an account?{' '}
            <Link to="/login" className="login-text">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;