import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faLightbulb, faUsers, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import '../styles/AboutUs.css';

const AboutUs = () => {
  // State to track if images have loaded
  const [imagesLoaded, setImagesLoaded] = useState({
    story: false,
  });

  // Handle image loading success
  const handleImageLoad = (imageType) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageType]: true
    }));
  };

  // Handle image loading error
  const handleImageError = (e, imageType) => {
    console.error(`Image ${imageType} failed to load`);
    // Keep the placeholder visible by setting loaded state to false
    setImagesLoaded(prev => ({
      ...prev,
      [imageType]: false
    }));
    // Hide the broken image
    e.target.style.display = 'none';
  };

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About MUSEUMIX</h1>
          <p className="page-subtitle">
            Creating virtual spaces for art lovers around the world
          </p>
        </div>
      </section>

      {/* Our Story Section - With improved layout */}
      <section className="our-story">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="story-grid">
            {/* Left side - Image */}
            <div className="story-image">
              <div className={`about-image-placeholder ${imagesLoaded.story ? 'image-loaded' : ''}`}>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="MUSEUMIX team collaborating on digital art curation"
                  onLoad={() => handleImageLoad('story')}
                  onError={(e) => handleImageError(e, 'story')}
                  className={imagesLoaded.story ? 'visible' : 'hidden'}
                />
              </div>
            </div>
            
            {/* Right side - Text content */}
            <div className="story-content">
              <p>
                MUSEUMIX was founded in 2021 by a group of art enthusiasts and technologists 
                who believed that art should be accessible to everyone, regardless of geographic 
                location or socioeconomic status.
              </p>
              <p>
                What began as a small project to create virtual galleries quickly grew into a 
                global platform connecting art lovers, curators, artists, and museums in a 
                vibrant digital ecosystem.
              </p>
              <p>
                Today, MUSEUMIX hosts thousands of virtual collections from users across 
                the globe, partnering with over 200 museums and galleries to bring art into 
                the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission">
        <div className="container">
          <h2 className="section-title centered">Our Mission</h2>
          <div className="mission-statement">
            <p>
              To democratize access to art through technology, enabling people worldwide to 
              discover, curate, and engage with artistic works in meaningful ways.
            </p>
          </div>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <FontAwesomeIcon icon={faPaintBrush} />
              </div>
              <h3>Creativity</h3>
              <p>
                We believe in fostering creativity in how art is experienced, 
                shared, and discussed in the digital realm.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </div>
              <h3>Accessibility</h3>
              <p>
                We're committed to making art accessible to everyone, 
                breaking down traditional barriers to art appreciation.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>Community</h3>
              <p>
                We build meaningful connections between artists, curators, 
                educators, and art enthusiasts worldwide.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously evolve our platform to explore new ways 
                of experiencing and interacting with art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Improved layout */}
      <section className="our-team">
        <div className="container">
          <h2 className="section-title centered">Meet Our Team</h2>
          <p className="section-description">
            Our diverse team brings together expertise in art history, museum curation, 
            technology, and education to create the best virtual art experience.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-photo-placeholder">
                <span>AL</span>
              </div>
              <h3 className="team-name">Alexandra Lee</h3>
              <p className="team-position">Founder & CEO</p>
              <p className="team-bio">
                Former museum curator with a passion for making art accessible to all.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-photo-placeholder">
                <span>MC</span>
              </div>
              <h3 className="team-name">Michael Chen</h3>
              <p className="team-position">Chief Technology Officer</p>
              <p className="team-bio">
                Tech innovator specializing in virtual experiences and digital preservation.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-photo-placeholder">
                <span>SR</span>
              </div>
              <h3 className="team-name">Sophia Rodriguez</h3>
              <p className="team-position">Art Director</p>
              <p className="team-bio">
                Award-winning artist with experience in digital and traditional mediums.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-photo-placeholder">
                <span>DP</span>
              </div>
              <h3 className="team-name">David Park</h3>
              <p className="team-position">Head of Partnerships</p>
              <p className="team-bio">
                Connects MUSEUMIX with museums and galleries around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="our-partners">
        <div className="container">
          <h2 className="section-title centered">Our Partners</h2>
          <p className="section-description">
            We collaborate with leading museums, galleries, educational institutions, and artists 
            to bring diverse collections to our platform.
          </p>

          <div className="partners-grid">
            <div className="partner-logo-placeholder">
              <div className="partner-logo-icon">
                <FontAwesomeIcon icon={faPaintBrush} />
              </div>
              <span>Partner Logo</span>
            </div>
            <div className="partner-logo-placeholder">
              <div className="partner-logo-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <span>Partner Logo</span>
            </div>
            <div className="partner-logo-placeholder">
              <div className="partner-logo-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <span>Partner Logo</span>
            </div>
            <div className="partner-logo-placeholder">
              <div className="partner-logo-icon">
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </div>
              <span>Partner Logo</span>
            </div>
            <div className="partner-logo-placeholder">
              <div className="partner-logo-icon">
                <FontAwesomeIcon icon={faPaintBrush} />
              </div>
              <span>Partner Logo</span>
            </div>
            <div className="partner-logo-placeholder">
              <div className="partner-logo-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <span>Partner Logo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Community</h2>
            <p className="cta-description">
              Become part of the MUSEUMIX family and start your virtual art journey today.
            </p>
            <div className="cta-buttons">
              <Link to="/create-account" className="btn btn-primary">Create Account</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;