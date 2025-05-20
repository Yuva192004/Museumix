import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContactPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Form status state
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate the field that changed
    validateField(name, value);
  };
  
  // Validate a single field
  const validateField = (fieldName, value) => {
    let errorMessage = '';
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Please enter your name';
        } else if (value.trim().length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errorMessage = 'Please enter your email address';
        } else if (!emailRegex.test(value.trim())) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          errorMessage = 'Please enter your message';
        } else if (value.trim().length < 10) {
          errorMessage = 'Message must be at least 10 characters';
        }
        break;
        
      default:
        break;
    }
    
    // Update the errors state
    setErrors({
      ...errors,
      [fieldName]: errorMessage
    });
    
    // Return whether the field is valid
    return !errorMessage;
  };
  
  // Validate all fields
  const validateForm = () => {
    const { name, email, message } = formData;
    
    // Validate each field
    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isMessageValid = validateField('message', message);
    
    // Return whether the form is valid
    return isNameValid && isEmailValid && isMessageValid;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (validateForm()) {
      // Set loading state
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // In a real app, you would send the form data to an API here
        console.log('Form submitted:', formData);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: 'general',
          message: ''
        });
        
        // Show success message
        setFormStatus({
          message: 'Your message has been sent successfully! We will get back to you soon.',
          type: 'success'
        });
        
        // Reset loading state
        setIsSubmitting(false);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus({
            message: '',
            type: ''
          });
        }, 5000);
      }, 1500);
    }
  };
  
const handleSocialClick = (platform) => {
  let url = '';
  switch (platform) {
    case 'facebook':
      url = 'https://www.facebook.com/yourpage';
      break;
    case 'twitter':
      url = 'https://twitter.com/yourhandle';
      break;
    case 'instagram':
      url = 'https://www.instagram.com/yourprofile';
      break;
    case 'youtube':
      url = 'https://www.youtube.com/yourchannel';
      break;
    default:
      return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};
  
  return (
    <main className="contact-container">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions or suggestions? We'd love to hear from you!</p>
      </section>

      <div className="contact-content">
        <section className="contact-form-section">
          <h2>Send us a message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
          </form>
        </section>

        <section className="contact-info-section">
          <div className="info-card">
            <h3>Our Information</h3>
            <div className="info-item">
              <strong>Email:</strong>
              <p>info@museumix.com</p>
            </div>
            <div className="info-item">
              <strong>Phone:</strong>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <strong>Hours:</strong>
              <p>Monday - Friday: 9AM - 6PM</p>
            </div>
          </div>
          
          <div className="social-links">
            <h3>Connect With Us</h3>
            <div className="social-icons">
  <button
    onClick={() => handleSocialClick('facebook')}
    aria-label="Visit our Facebook page"
    className="social-icon facebook"
  >
    <FontAwesomeIcon icon={faFacebookF} />
  </button>
  <button
    onClick={() => handleSocialClick('twitter')} 
    aria-label="Visit our Twitter profile"
    className="social-icon twitter"
  >
    <FontAwesomeIcon icon={faTwitter} />
  </button>
  <button
    onClick={() => handleSocialClick('instagram')}
    aria-label="Visit our Instagram profile"
    className="social-icon instagram"
  >
    <FontAwesomeIcon icon={faInstagram} />
  </button>
  <button
    onClick={() => handleSocialClick('youtube')}
    aria-label="Visit our YouTube channel"
    className="social-icon youtube"
  >
    <FontAwesomeIcon icon={faYoutube} />
  </button>
</div>     
          </div>

          <div className="faq-link">
            <h3>Have More Questions?</h3>
            <p>Check our <Link to="/faq">Frequently Asked Questions</Link> page to see if your question has already been answered.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;