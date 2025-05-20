import React from 'react';
import { Link } from 'react-router-dom';
import artwork1 from '../assets/birmingham-museums-trust-sJr8LDyEf7k-unsplash.jpg';
import artwork2 from '../assets/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg';
import artwork3 from '../assets/dan-farrell-fT49QnFucQ8-unsplash.jpg';
import '../styles/LandingPage.css';
// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faGlobeAmericas, faUsers, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to MUSEUMIX</h1>
          <p className="hero-subtitle">Create, curate, and explore virtual art collections from around the world</p>
          <div className="hero-buttons">
            <Link to="/gallery" className="btn btn-primary">Explore Galleries</Link>
            <Link to="/create-account" className="btn btn-secondary">Create Account</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Discover the Art World</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faPaintBrush} />
              </div>
              <h3 className="feature-title">Curate Collections</h3>
              <p className="feature-description">
                Create personal galleries with artworks from renowned museums and emerging artists.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </div>
              <h3 className="feature-title">Explore Worldwide</h3>
              <p className="feature-description">
                Discover artworks from different cultures, periods, and styles from around the globe.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3 className="feature-title">Join the Community</h3>
              <p className="feature-description">
                Connect with fellow art enthusiasts, share collections, and discuss artistic inspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview">
        <div className="container">
          <h2 className="section-title">Featured Artworks</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={artwork1} alt="Featured Artwork" className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <h4>Night Café</h4>
                    <p>Vincent van Gogh</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={artwork2} alt="Featured Artwork" className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <h4>The Persistence of Memory</h4>
                    <p>Salvador Dalí</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={artwork3} alt="Featured Artwork" className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <h4>Girl with a Pearl Earring</h4>
                    <p>Johannes Vermeer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={artwork1} alt="Featured Artwork" className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <h4>The Great Wave off Kanagawa</h4>
                    <p>Hokusai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="view-more-container">
            <Link to="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Start Your Art Journey Today</h2>
            <p className="cta-description">Join thousands of art enthusiasts creating and sharing virtual collections</p>
            <Link to="/create-account" className="btn btn-primary cta-button">Create Free Account</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <div className="testimonial-quote">
                <FontAwesomeIcon icon={faQuoteLeft} />
                <p>MUSEUMIX has transformed how I experience art. I can create collections of my favorite pieces and discover new artists all in one place.</p>
                <div className="testimonial-author">
                  <p className="author-name">Sarah Johnson</p>
                  <p className="author-title">Art Student</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-quote">
                <FontAwesomeIcon icon={faQuoteLeft} />
                <p>As an art teacher, I use MUSEUMIX to create visual lessons for my students. It's become an invaluable educational resource.</p>
                <div className="testimonial-author">
                  <p className="author-name">David Winters</p>
                  <p className="author-title">Art Educator</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-quote">
                <FontAwesomeIcon icon={faQuoteLeft} />
                <p>The ability to curate and share personal collections has connected me with art lovers around the world. It's a truly global community.</p>
                <div className="testimonial-author">
                  <p className="author-name">Michelle Chen</p>
                  <p className="author-title">Gallery Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;