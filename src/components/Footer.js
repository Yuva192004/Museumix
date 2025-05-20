import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
// Make sure you have Font Awesome installed in your project
// npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">MUSEUMIX</h3>
            <p className="footer-description">
              Create, curate, and explore virtual art collections from around the world.
              Join our community of art enthusiasts and creators.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li className="footer-link"><Link to="/gallery">Gallery</Link></li>
              <li className="footer-link"><Link to="/featured-artists">Featured Artists</Link></li>
              <li className="footer-link"><Link to="/collections">Collections</Link></li>
              <li className="footer-link"><Link to="/exhibitions">Virtual Exhibitions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li className="footer-link"><Link to="/about">About Us</Link></li>
              <li className="footer-link"><Link to="/faq">FAQ</Link></li>
              <li className="footer-link"><Link to="/blog">Art Blog</Link></li>
              <li className="footer-link"><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Subscribe</h4>
            <p className="footer-description">Stay updated with our latest exhibitions and featured collections.</p>
            <form className="subscribe-form">
              <input 
                type="email" 
                className="subscribe-input" 
                placeholder="Your email address" 
              />
              <button type="submit" className="subscribe-btn">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MUSEUMIX - A Virtual Art Collection Creator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;