import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Gallery.css';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Fetch galleries from backend
    setLoading(true);
    axios.get('http://localhost:5000/api/galleries')
      .then(response => {
        setGalleries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching galleries:', error);
        setError('Failed to load galleries. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
  };

  const handleBackClick = () => {
    setSelectedGallery(null);
  };

  const filteredGalleries = galleries.filter(gallery => 
    gallery.name.toLowerCase().includes(filter.toLowerCase()) || 
    gallery.description.toLowerCase().includes(filter.toLowerCase())
  );

  // Gallery Detail View
  if (selectedGallery) {
    return (
      <div className="gallery-detail">
        <button className="back-button" onClick={handleBackClick}>
          <span>←</span> Back to Galleries
        </button>
        
        <div className="gallery-header">
          <h2>{selectedGallery.name}</h2>
          <p className="gallery-description">{selectedGallery.description}</p>
          {selectedGallery.curator && (
            <p className="gallery-curator">Curated by: {selectedGallery.curator}</p>
          )}
        </div>
        
        <div className="artwork-grid">
          {selectedGallery.artworks && selectedGallery.artworks.map((artwork, index) => (
            <div key={index} className="artwork-card">
              <div className="artwork-image-container">
                <img 
                  src={artwork.imageUrl || 'https://via.placeholder.com/300x200?text=Artwork'} 
                  alt={artwork.title}
                  className="artwork-image"
                />
              </div>
              <div className="artwork-info">
                <h3>{artwork.title}</h3>
                <p className="artwork-artist">{artwork.artist}</p>
                <p className="artwork-year">{artwork.year}</p>
              </div>
            </div>
          ))}
          
          {(!selectedGallery.artworks || selectedGallery.artworks.length === 0) && (
            <div className="empty-gallery">
              <p>No artworks in this gallery yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Gallery List View
  return (
    <div className="gallery-container">
      <div className="gallery-header-main">
        <h2>Art Galleries</h2>
        <p className="gallery-subtitle">Explore curated collections from around the world</p>
      </div>
      
      <div className="gallery-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search galleries..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="gallery-search"
          />
        </div>
        
        <div className="view-toggle">
          <button 
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {loading ? (
        <div className="gallery-loading">
          <div className="loading-spinner"></div>
          <p>Loading galleries...</p>
        </div>
      ) : error ? (
        <div className="gallery-error">
          <p>{error}</p>
        </div>
      ) : (
        <div className={`gallery-list ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
          {filteredGalleries.length > 0 ? (
            filteredGalleries.map((gallery, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => handleGalleryClick(gallery)}
              >
                <div className="gallery-item-image">
                  <img 
                    src={gallery.coverImage || 'https://via.placeholder.com/400x300?text=Gallery'} 
                    alt={gallery.name}
                  />
                </div>
                <div className="gallery-item-content">
                  <h3>{gallery.name}</h3>
                  <p>{gallery.description}</p>
                  {gallery.artworkCount && (
                    <span className="artwork-count">{gallery.artworkCount} artworks</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No galleries found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;