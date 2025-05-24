import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Gallery.css';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [imageErrors, setImageErrors] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/galleries`);
        const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
        setGalleries(data);
      } catch (err) {
        console.error('Error fetching galleries:', err);
        setError('Failed to load galleries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, [API_BASE_URL]);

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
  };

  const handleBackClick = () => {
    setSelectedGallery(null);
    setImageErrors({});
  };

  const handleImageError = (url, key) => {
    console.error(`Image load failed for URL: ${url}`);
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  const getImageUrl = (path) => {
    if (!path) return '/placeholder-image.jpg';
    
    // Check if path is already a complete URL
    if (path.startsWith('http')) return path;
    
    // Handle cases where path might already have a leading slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Check if the path is already complete with the base URL
    if (normalizedPath.includes(API_BASE_URL)) return normalizedPath;
    
    return `${API_BASE_URL}${normalizedPath}`;
  };

  const filteredGalleries = galleries.filter(gallery => 
    gallery?.name?.toLowerCase().includes(filter.toLowerCase()) || 
    gallery?.description?.toLowerCase().includes(filter.toLowerCase())
  );

  if (selectedGallery) {
    return (
      <div className="gallery-detail">
        <button className="back-button" onClick={handleBackClick}>
          ← Back to Galleries
        </button>
        
        <div className="gallery-header">
          <h2>{selectedGallery.name}</h2>
          <p className="gallery-description">{selectedGallery.description}</p>
          {selectedGallery.curator && (
            <p className="gallery-curator">
              Curated by: {selectedGallery.curator.firstName} {selectedGallery.curator.lastName}
            </p>
          )}
        </div>
        
        <div className="artwork-grid">
          {selectedGallery.artworks?.map((artwork) => {
            const imageUrl = getImageUrl(artwork.imageUrl);
            const imageKey = `artwork-${artwork._id}`;

            return (
              <div key={artwork._id} className="artwork-card">
                <div className="artwork-image-container">
                  {!imageErrors[imageKey] ? (
                    <img 
                      src={imageUrl}
                      alt={`${artwork.title} by ${artwork.artist}`}
                      onError={() => handleImageError(imageUrl, imageKey)}
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <div className="placeholder-icon">🖼️</div>
                      <p>{artwork.title}</p>
                    </div>
                  )}
                </div>
                <div className="artwork-info">
                  <h3>{artwork.title}</h3>
                  <p className="artwork-artist">{artwork.artist}</p>
                  <p className="artwork-year">{artwork.year}</p>
                </div>
              </div>
            );
          })}
          
          {!selectedGallery.artworks?.length && (
            <div className="empty-gallery">
              <p>No artworks in this gallery yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header-main">
        <h2>Art Galleries</h2>
        <p className="gallery-subtitle">Explore curated collections</p>
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
        <div className={`gallery-list ${viewMode}`}>
          {filteredGalleries.length > 0 ? (
            filteredGalleries.map((gallery) => {
              const coverImageUrl = getImageUrl(gallery.coverImage);
              const galleryKey = `gallery-${gallery._id}`;

              return (
                <div 
                  key={gallery._id}
                  className="gallery-item"
                  onClick={() => handleGalleryClick(gallery)}
                >
                  <div className="gallery-item-image">
                    {!imageErrors[galleryKey] ? (
                      <img 
                        src={coverImageUrl}
                        alt={gallery.name}
                        onError={() => handleImageError(coverImageUrl, galleryKey)}
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="image-placeholder">
                        <div className="placeholder-icon">🏛️</div>
                        <p>{gallery.name}</p>
                      </div>
                    )}
                  </div>
                  <div className="gallery-item-content">
                    <h3>{gallery.name}</h3>
                    <p className="gallery-description">{gallery.description}</p>
                    {gallery.artworks?.length > 0 && (
                      <span className="artwork-count">
                        {gallery.artworks.length} artwork{gallery.artworks.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
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