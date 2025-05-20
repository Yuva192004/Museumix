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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      alert(res.data.msg || 'Account created successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Account creation failed.';
      setError(msg);
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
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary account-button"
            >
              CREATE ACCOUNT
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