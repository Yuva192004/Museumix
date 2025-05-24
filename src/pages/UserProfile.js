import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userArtworks, setUserArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('artworks');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    bio: ''
  });

  // Backend URL
  const API_BASE_URL = 'http://localhost:5000';

  // Set up axios defaults with auth token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        // Fetch user profile
        const userRes = await axios.get(`${API_BASE_URL}/api/auth/profile`);
        setUser(userRes.data.user);
        setEditForm({
          firstName: userRes.data.user.firstName,
          lastName: userRes.data.user.lastName,
          bio: userRes.data.user.bio || ''
        });
        
        // Fetch user's artworks
        const artworksRes = await axios.get(`${API_BASE_URL}/api/user/artworks`);
        setUserArtworks(artworksRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.msg || 'Failed to load profile data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/auth/profile`, editForm);
      setUser(res.data.user);
      setIsEditing(false);
      
      // Update localStorage user data
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...storedUser, ...res.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.msg || 'Failed to update profile');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Calculate user stats from actual data
  const userStats = {
    artworks: userArtworks.length,
    totalViews: userArtworks.reduce((sum, art) => sum + (art.views || 0), 0),
    totalLikes: userArtworks.reduce((sum, art) => sum + (art.likes || 0), 0),
    memberSince: user ? new Date(user.createdAt || user.joinDate).getFullYear() : new Date().getFullYear()
  };

  // Get recent artworks for activity
  const recentArtworks = userArtworks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (loading) return <div className="loading-spinner">Loading profile...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!user) return <div className="error-message">User not found</div>;

  return (
    <div className="user-profile-container">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-header-content">
              <div className="avatar-container">
                <img 
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=667eea&color=fff&size=150`} 
                  alt="Profile" 
                  className="avatar-img"
                />
              </div>
              
              <div className="user-details">
                {!isEditing ? (
                  <>
                    <h1 className="user-name">{user.firstName} {user.lastName}</h1>
                    <p className="user-email">{user.email}</p>
                    <p className="join-date">Member since {userStats.memberSince}</p>
                    <p className="user-bio">{user.bio || 'Welcome to my profile!'}</p>
                  </>
                ) : (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Bio</label>
                      <textarea 
                        name="bio"
                        value={editForm.bio}
                        onChange={handleEditChange}
                        rows="3"
                        placeholder="Tell us about yourself..."
                        maxLength="300"
                      />
                      <small>{editForm.bio.length}/300</small>
                    </div>
                    <div className="form-buttons">
                      <button onClick={() => setIsEditing(false)}>Cancel</button>
                      <button onClick={handleEditSubmit}>Save</button>
                    </div>
                  </div>
                )}
              </div>
              
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Edit Profile
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-value">{userStats.artworks}</div>
                <div className="stat-label">Artworks</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userStats.totalViews}</div>
                <div className="stat-label">Total Views</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userStats.totalLikes}</div>
                <div className="stat-label">Total Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            <button 
              onClick={() => handleTabChange('artworks')}
              className={`tab-btn ${activeTab === 'artworks' ? 'active' : ''}`}
            >
              My Artworks ({userArtworks.length})
            </button>
            <button
              onClick={() => handleTabChange('stats')}
              className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            >
              Statistics
            </button>
            <button
              onClick={() => handleTabChange('activity')}
              className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            >
              Recent Activity
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'artworks' && (
              <div className="artworks-tab">
                {userArtworks.length > 0 ? (
                  <div className="artworks-grid">
                    {userArtworks.map(artwork => (
                      <div key={artwork._id} className="artwork-card">
                        <img 
                          src={artwork.imageUrl} 
                          alt={artwork.title}
                          className="artwork-image"
                        />
                        <div className="artwork-info">
                          <h3>{artwork.title}</h3>
                          <p>{artwork.description}</p>
                          <div className="artwork-stats">
                            <span>👁 {artwork.views || 0}</span>
                            <span>❤ {artwork.likes || 0}</span>
                          </div>
                          <small>{new Date(artwork.createdAt).toLocaleDateString()}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>No artworks yet</h3>
                    <p>Start sharing your creative works!</p>
                    <button onClick={() => window.location.href = '/upload'}>
                      Upload Artwork
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="stats-tab">
                <div className="stats-overview">
                  <div className="stats-card">
                    <h3>Overview</h3>
                    <div className="stats-list">
                      <div className="stat-row">
                        <span>Total Artworks:</span>
                        <strong>{userStats.artworks}</strong>
                      </div>
                      <div className="stat-row">
                        <span>Total Views:</span>
                        <strong>{userStats.totalViews}</strong>
                      </div>
                      <div className="stat-row">
                        <span>Total Likes:</span>
                        <strong>{userStats.totalLikes}</strong>
                      </div>
                      <div className="stat-row">
                        <span>Average Views per Artwork:</span>
                        <strong>{userStats.artworks ? Math.round(userStats.totalViews / userStats.artworks) : 0}</strong>
                      </div>
                    </div>
                  </div>

                  {userArtworks.length > 0 && (
                    <div className="stats-card">
                      <h3>Top Performing Artworks</h3>
                      <div className="top-artworks">
                        {userArtworks
                          .sort((a, b) => (b.views || 0) - (a.views || 0))
                          .slice(0, 3)
                          .map((artwork, index) => (
                            <div key={artwork._id} className="top-artwork">
                              <span className="rank">#{index + 1}</span>
                              <span className="title">{artwork.title}</span>
                              <span className="views">{artwork.views || 0} views</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-tab">
                <h3>Recent Activity</h3>
                {recentArtworks.length > 0 ? (
                  <div className="activity-list">
                    {recentArtworks.map(artwork => (
                      <div key={artwork._id} className="activity-item">
                        <div className="activity-content">
                          <p>
                            <strong>Uploaded:</strong> {artwork.title}
                          </p>
                          <small>{new Date(artwork.createdAt).toLocaleString()}</small>
                        </div>
                        <div className="activity-stats">
                          <span>{artwork.views || 0} views</span>
                          <span>{artwork.likes || 0} likes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>No activity yet</h3>
                    <p>Your recent uploads will appear here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;