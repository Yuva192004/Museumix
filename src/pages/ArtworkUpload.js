import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/ArtworkUpload.css';

const ArtworkUpload = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [medium, setMedium] = useState('');
  const [description, setDescription] = useState('');
  const [galleryId, setGalleryId] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch galleries for dropdown selection
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/galleries');
        setGalleries(response.data);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      }
    };
    fetchGalleries();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setImage(selectedFile);
      
      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSubmitStatus({
        type: 'error',
        message: 'Please select a valid image file (JPG, PNG, GIF)'
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setImage(droppedFile);
        
        // Create preview URL for the dropped image
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Please drop a valid image file (JPG, PNG, GIF)'
        });
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !image) {
      setSubmitStatus({
        type: 'error',
        message: 'Please provide at least a title and an image.'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('year', year);
    formData.append('medium', medium);
    formData.append('description', description);
    if (galleryId) formData.append('galleryId', galleryId);
    if (tags) formData.append('tags', tags);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/artworks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSubmitStatus({
        type: 'success',
        message: 'Artwork uploaded successfully!'
      });
      
      // Reset form
      setTitle('');
      setArtist('');
      setYear('');
      setMedium('');
      setDescription('');
      setGalleryId('');
      setTags('');
      setImage(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Call the callback if provided
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 
               error.message || 
               'Error uploading artwork. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="artwork-upload-container">
      <div className="artwork-upload-content">
        <div className="upload-header">
          <h2>Upload Artwork</h2>
          <p className="upload-subtitle">Share your masterpiece with the MUSEUMIX community</p>
        </div>
        
        {submitStatus && (
          <div className={`upload-status ${submitStatus.type}`}>
            <p>{submitStatus.message}</p>
            {submitStatus.type === 'success' && (
              <button 
                className="close-status"
                onClick={() => setSubmitStatus(null)}
              >
                ×
              </button>
            )}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-columns">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="artwork-title">Title *</label>
                <input
                  id="artwork-title"
                  type="text"
                  placeholder="Title of your artwork"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="artwork-artist">Artist</label>
                <input
                  id="artwork-artist"
                  type="text"
                  placeholder="Artist name"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="artwork-year">Year</label>
                  <input
                    id="artwork-year"
                    type="text"
                    placeholder="Year created"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="artwork-medium">Medium</label>
                  <input
                    id="artwork-medium"
                    type="text"
                    placeholder="Oil, Acrylic, Digital, etc."
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="artwork-description">Description</label>
                <textarea
                  id="artwork-description"
                  placeholder="Tell us about your artwork..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="artwork-gallery">Gallery</label>
                <select
                  id="artwork-gallery"
                  value={galleryId}
                  onChange={(e) => setGalleryId(e.target.value)}
                >
                  <option value="">Select a gallery</option>
                  {galleries.map((gallery) => (
                    <option key={gallery._id || gallery.id} value={gallery._id || gallery.id}>
                      {gallery.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="artwork-tags">Tags</label>
                <input
                  id="artwork-tags"
                  type="text"
                  placeholder="Separate tags with commas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <small>Example: contemporary, landscape, abstract</small>
              </div>
            </div>
            
            <div className="form-column">
              <div className="form-group">
                <label>Artwork Image *</label>
                <div 
                  className={`image-upload-area ${previewUrl ? 'has-image' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    accept="image/*"
                    className="file-input"
                  />
                  
                  {previewUrl ? (
                    <div className="image-preview-container">
                      <img src={previewUrl} alt="Preview" className="image-preview" />
                      <button 
                        type="button" 
                        className="remove-image"
                        onClick={removeImage}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p>Drag and drop your image here</p>
                      <p className="upload-or">or</p>
                      <button type="button" className="browse-button">Browse Files</button>
                      <p className="file-limits">JPG, PNG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Uploading...' : 'Upload Artwork'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtworkUpload;