import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faStar,
  faThLarge,
  faGlobe,
  faInfoCircle,
  faQuestionCircle,
  faPenFancy,
  faEnvelope,
  faBars // Hamburger icon
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="hamburger" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-logo">
          <h2></h2>
        </div>

        <div className="sidebar-section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/featured-artists"><FontAwesomeIcon icon={faStar} className="sidebar-icon" />Featured Artists</Link></li>
            <li><Link to="/collections"><FontAwesomeIcon icon={faThLarge} className="sidebar-icon" />Collections</Link></li>
            <li><Link to="/exhibitions"><FontAwesomeIcon icon={faGlobe} className="sidebar-icon" />Virtual Exhibitions</Link></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/about"><FontAwesomeIcon icon={faInfoCircle} className="sidebar-icon" />About Us</Link></li>
            <li><Link to="/faq"><FontAwesomeIcon icon={faQuestionCircle} className="sidebar-icon" />FAQ</Link></li>
            <li><Link to="/blog"><FontAwesomeIcon icon={faPenFancy} className="sidebar-icon" />Art Blog</Link></li>
            <li><Link to="/contact"><FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />Contact</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
