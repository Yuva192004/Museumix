import React, { useState } from 'react';
import '../styles/Collections.css';

const Collections = () => {
  // Collections data with categories
  const [collections, setCollections] = useState([
    {
      id: 1,
      title: "Modern Expressions",
      description: "Contemporary artworks that push boundaries and challenge conventional aesthetics.",
      image: "/api/placeholder/400/300",
      pieces: 24,
      category: "contemporary"
    },
    {
      id: 2,
      title: "Renaissance Revival",
      description: "A curated selection of works inspired by Renaissance techniques and themes.",
      image: "/api/placeholder/400/300",
      pieces: 18,
      category: "classical"
    },
    {
      id: 3,
      title: "Digital Frontiers",
      description: "Exploring the intersection of technology and artistic expression in the digital age.",
      image: "/api/placeholder/400/300",
      pieces: 32,
      category: "digital"
    },
    {
      id: 4,
      title: "Urban Perspectives",
      description: "Street art and urban-inspired works that reflect city life and culture.",
      image: "/api/placeholder/400/300",
      pieces: 29,
      category: "contemporary"
    },
    {
      id: 5,
      title: "Abstract Visions",
      description: "Non-representational art that focuses on form, color, and expressive gesture.",
      image: "/api/placeholder/400/300",
      pieces: 21,
      category: "contemporary"
    },
    {
      id: 6,
      title: "Cultural Heritage",
      description: "Traditional and folk art celebrating diverse cultural expressions worldwide.",
      image: "/api/placeholder/400/300",
      pieces: 27,
      category: "cultural"
    },
    {
      id: 7,
      title: "Impressionist Light",
      description: "Works inspired by the light and color techniques of Impressionist masters.",
      image: "/api/placeholder/400/300",
      pieces: 16,
      category: "classical"
    },
    {
      id: 8,
      title: "Virtual Realities",
      description: "Immersive digital works exploring VR, AR, and interactive experiences.",
      image: "/api/placeholder/400/300",
      pieces: 14,
      category: "digital"
    }
  ]);

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Collections" },
    { id: "contemporary", name: "Contemporary" },
    { id: "classical", name: "Classical" },
    { id: "digital", name: "Digital Art" },
    { id: "cultural", name: "Cultural" }
  ];

  // State for active category filter
  const [activeCategory, setActiveCategory] = useState("all");

  // Function to filter collections by category
  const filteredCollections = activeCategory === "all" 
    ? collections 
    : collections.filter(collection => collection.category === activeCategory);

  return (
    <div className="collections-container">
      <div className="collections-header">
        <h1>Art Collections</h1>
        <p>Explore our curated collections of exceptional artwork from around the world</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button 
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="collections-grid">
        {filteredCollections.map(collection => (
          <div className="collection-card" key={collection.id}>
            <div className="collection-image">
              <img src={collection.image} alt={collection.title} />
              <div className="collection-pieces">
                <span>{collection.pieces} Artworks</span>
              </div>
            </div>
            <div className="collection-info">
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <button className="view-collection-btn">View Collection</button>
            </div>
          </div>
        ))}
      </div>

      <div className="collections-cta">
        <div className="cta-content">
          <h2>Create Your Own Collection</h2>
          <p>Become a curator and build your own virtual gallery of favorite artworks.</p>
          <button className="create-collection-btn">Start Curating</button>
        </div>
      </div>
    </div>
  );
};

export default Collections;