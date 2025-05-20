import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faChevronUp, 
  faQuestionCircle, 
  faEnvelope, 
  faSearch 
} from '@fortawesome/free-solid-svg-icons';
import '../styles/FAQ.css';

const FAQ = () => {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState({});
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle FAQ item expansion
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // FAQ categories and questions
  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          id: "gs1",
          question: "What is MUSEUMIX?",
          answer: "MUSEUMIX is a digital platform that allows users to explore, curate, and create virtual art collections from museums and galleries around the world. We aim to democratize access to art through technology, enabling people worldwide to discover and engage with artistic works in meaningful ways."
        },
        {
          id: "gs2",
          question: "How do I create an account?",
          answer: "Creating an account is simple! Click on the 'Create Account' button in the top navigation bar, then fill out the registration form with your email address and create a password. Verify your email address through the link we'll send you, and you're ready to start your virtual art journey."
        },
        {
          id: "gs3",
          question: "Is MUSEUMIX free to use?",
          answer: "MUSEUMIX offers both free and premium account options. With a free account, you can browse existing collections, create your own collections (up to 5), and participate in community discussions. Premium accounts offer additional features such as unlimited collections, high-resolution downloads, exclusive virtual exhibitions, and more."
        }
      ]
    },
    {
      category: "Using the Platform",
      questions: [
        {
          id: "up1",
          question: "How do I create my own virtual art collection?",
          answer: "To create a collection, log into your account and navigate to your profile page. Click on 'Create New Collection,' give it a title and description, then start adding artwork by browsing our partnered museum collections or uploading your own pieces. You can organize your collection into categories, add contextual information, and share it with others when ready."
        },
        {
          id: "up2",
          question: "Can I upload my own artwork?",
          answer: "Yes! MUSEUMIX supports artists and creators. You can upload your own original artwork by navigating to the 'Upload Artwork' section. We accept various file formats including JPG, PNG, and SVG with a maximum file size of 20MB per image. Please ensure you have the rights to any work you upload."
        },
        {
          id: "up3",
          question: "How do I share my collections with others?",
          answer: "Each collection has sharing options accessible through the 'Share' button. You can generate a public link, share directly to social media platforms, or embed your collection on your website or blog. You can also control privacy settings to make collections public, private, or shared with specific users."
        },
        {
          id: "up4",
          question: "Can I collaborate with others on a collection?",
          answer: "Yes! MUSEUMIX supports collaborative curation. When viewing your collection, click on 'Manage Collaborators' to invite others by email. You can set different permission levels including viewer, contributor (can add artwork), or co-curator (full editing privileges)."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          id: "ts1",
          question: "What devices and browsers are supported?",
          answer: "MUSEUMIX is optimized for modern web browsers including Chrome, Firefox, Safari, and Edge. We support both desktop and mobile devices. For the best experience, we recommend using the latest version of your preferred browser."
        },
        {
          id: "ts2",
          question: "I'm experiencing technical issues. What should I do?",
          answer: "If you're experiencing technical difficulties, try refreshing the page or clearing your browser cache. If problems persist, please visit our Help Center where we have troubleshooting guides for common issues. For further assistance, contact our support team through the 'Contact' page."
        },
        {
          id: "ts3",
          question: "Is my data secure on MUSEUMIX?",
          answer: "Yes, we take data security seriously. MUSEUMIX uses encryption to protect your personal information and collection data. We never share your private information with third parties without your consent. For more details, please review our Privacy Policy."
        }
      ]
    },
    {
      category: "Partnerships and Education",
      questions: [
        {
          id: "pe1",
          question: "I'm a museum or gallery. How can we partner with MUSEUMIX?",
          answer: "We love partnering with cultural institutions! Please contact our partnerships team at partnerships@museumix.com to discuss collaboration opportunities. We offer various partnership models to digitize and showcase your collections to our global audience."
        },
        {
          id: "pe2",
          question: "Does MUSEUMIX offer educational resources?",
          answer: "Yes! MUSEUMIX is committed to art education. We provide curriculum resources for educators, virtual field trips for classrooms, and interactive learning modules. Visit our 'Education' section to explore these resources or contact us about custom solutions for your educational needs."
        },
        {
          id: "pe3",
          question: "Can MUSEUMIX be used for academic research?",
          answer: "Absolutely. Many researchers and academics use our platform for art history research, cultural studies, and digital humanities projects. We offer citation tools and high-resolution imagery for academic purposes. Premium accounts include additional research features like comparative analysis tools and metadata exports."
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredFAQs = searchQuery.trim() === '' ? faqData : 
    faqData.map(category => ({
      ...category,
      questions: category.questions.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.questions.length > 0);

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find answers to common questions about using MUSEUMIX
          </p>
          
          {/* Search Bar */}
          <div className="faq-search">
            <div className="search-input-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search questions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="container">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, index) => (
              <div className="faq-category" key={index}>
                <h2 className="category-title">{category.category}</h2>
                
                {category.questions.length > 0 ? (
                  <div className="faq-items">
                    {category.questions.map((item) => (
                      <div className="faq-item" key={item.id}>
                        <div 
                          className={`faq-question ${expandedItems[item.id] ? 'active' : ''}`}
                          onClick={() => toggleExpand(item.id)}
                        >
                          <h3>{item.question}</h3>
                          <span className="toggle-icon">
                            <FontAwesomeIcon icon={expandedItems[item.id] ? faChevronUp : faChevronDown} />
                          </span>
                        </div>
                        
                        <div className={`faq-answer ${expandedItems[item.id] ? 'expanded' : ''}`}>
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-results">No questions found in this category.</p>
                )}
              </div>
            ))
          ) : (
            <div className="no-results-container">
              <FontAwesomeIcon icon={faQuestionCircle} className="no-results-icon" />
              <p className="no-results">No results found for "{searchQuery}"</p>
              <p className="try-again">Try different keywords or browse all categories below</p>
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="need-help">
        <div className="container">
          <div className="help-content">
            <h2>Still Have Questions?</h2>
            <p>
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="help-buttons">
              <Link to="/contact" className="btn btn-primary">
                <FontAwesomeIcon icon={faEnvelope} /> Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;