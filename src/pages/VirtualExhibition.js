import React, { useState } from 'react';
import '../styles/VirtualExhibition.css';

const VirtualExhibition = () => {
  const [exhibitions, setExhibitions] = useState([
    {
      id: 1,
      title: "Future Forms",
      description: "An exploration of futuristic art and AI-generated creativity.",
      image: "/api/placeholder/400/300",
      artworks: 12,
      category: "ai"
    },
    {
      id: 2,
      title: "Nature Reimagined",
      description: "Virtual interpretations of landscapes and the natural world.",
      image: "/api/placeholder/400/300",
      artworks: 20,
      category: "nature"
    },
    {
      id: 3,
      title: "Surreal Realities",
      description: "Step into dreamlike worlds crafted by digital artists.",
      image: "/api/placeholder/400/300",
      artworks: 15,
      category: "surreal"
    },
    {
      id: 4,
      title: "Human Connections",
      description: "Emotion-driven exhibitions exploring people and stories.",
      image: "/api/placeholder/400/300",
      artworks: 18,
      category: "emotive"
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Exhibitions' },
    { id: 'ai', name: 'AI Art' },
    { id: 'nature', name: 'Nature' },
    { id: 'surreal', name: 'Surrealism' },
    { id: 'emotive', name: 'Emotive' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredExhibitions = activeCategory === 'all'
    ? exhibitions
    : exhibitions.filter(e => e.category === activeCategory);

  return (
    <div className="exhibition-container">
      <div className="exhibition-header">
        <h1>Virtual Exhibitions</h1>
        <p>Experience immersive digital art spaces from anywhere in the world.</p>
      </div>

      <div className="exhibition-filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`exhibition-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="exhibition-grid">
        {filteredExhibitions.map(exhibit => (
          <div className="exhibition-card" key={exhibit.id}>
            <div className="exhibition-image">
              <img src={exhibit.image} alt={exhibit.title} />
              <div className="exhibition-artworks">
                <span>{exhibit.artworks} Artworks</span>
              </div>
            </div>
            <div className="exhibition-info">
              <h3>{exhibit.title}</h3>
              <p>{exhibit.description}</p>
              <button className="view-exhibition-btn">View Exhibition</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualExhibition;
