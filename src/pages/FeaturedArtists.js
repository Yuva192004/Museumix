import React, { useState } from 'react';
import '../styles/FeaturedArtists.css';

const FeaturedArtists = () => {
  // Sample data for featured artists
const [artists] = useState([
  {
    id: 1,
    name: 'Sophia Chen',
    specialty: 'Digital Illustration',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=faces&fit=crop&w=300&h=300',
    bio: 'Contemporary digital artist known for vibrant landscapes and surreal portraits that blend traditional techniques with modern digital tools.',
    featured: 'Dreamscape Series (2024)'
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    specialty: 'Abstract Sculpture',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=faces&fit=crop&w=300&h=300',
    bio: 'Innovative sculptor who transforms recycled materials into thought-provoking abstract forms that challenge our perception of space.',
    featured: 'Urban Remnants Collection'
  },
  {
    id: 3,
    name: 'Aisha Patel',
    specialty: 'Mixed Media',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=faces&fit=crop&w=300&h=300',
    bio: 'Her work explores cultural identity through a blend of traditional textiles, photography, and digital manipulation.',
    featured: 'Heritage in Motion Exhibition'
  },
  {
    id: 4,
    name: 'Thomas Kwon',
    specialty: 'Experimental Photography',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?crop=faces&fit=crop&w=300&h=300',
    bio: 'Pushes the boundaries of photography with innovative techniques that capture light and movement in unexpected ways.',
    featured: 'Light Fragments (2024)'
  }
]);


  const [activeArtist, setActiveArtist] = useState(artists[0]);

  // Function to handle clicking on an artist
  const handleArtistSelect = (artist) => {
    setActiveArtist(artist);
  };

  return (
    <div className="featured-artists-container">
      <div className="featured-artists-header">
        <h2>Featured Artists</h2>
        <p>Discover extraordinary talent from around the world</p>
      </div>

      <div className="featured-artists-content">
        <div className="artist-list">
          {artists.map(artist => (
            <div 
              key={artist.id} 
              className={`artist-card ${activeArtist.id === artist.id ? 'active' : ''}`}
              onClick={() => handleArtistSelect(artist)}
            >
              <div className="artist-card-image">
                <img src={artist.image} alt={artist.name} />
              </div>
              <div className="artist-card-info">
                <h3>{artist.name}</h3>
                <p>{artist.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="artist-showcase">
          <div className="artist-showcase-image">
            <img src={activeArtist.image} alt={activeArtist.name} />
          </div>
          <div className="artist-showcase-details">
            <h2>{activeArtist.name}</h2>
            <h3>{activeArtist.specialty}</h3>
            <p className="artist-bio">{activeArtist.bio}</p>
            <div className="featured-work">
              <h4>Featured Work</h4>
              <p>{activeArtist.featured}</p>
            </div>
            <button className="view-gallery-btn">View Full Gallery</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtists;