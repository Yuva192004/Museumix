import React, { useState } from 'react';
import '../styles/UserProfile.css';  // Import the CSS file

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'user@example.com',
    bio: 'Art enthusiast and digital curator passionate about impressionist paintings.',
    avatar: '/api/placeholder/150/150',
    joinDate: 'March 2025',
    galleries: [
      { id: 1, name: 'Modern Abstracts', artworks: 12, views: 234 },
      { id: 2, name: 'Renaissance Masterpieces', artworks: 8, views: 186 },
      { id: 3, name: 'Contemporary Photography', artworks: 15, views: 312 }
    ],
    stats: {
      uploads: 35,
      favorites: 48,
      followers: 127,
      following: 93
    }
  });

  const [activeTab, setActiveTab] = useState('galleries');

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio
  });

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = () => {
    setUser({
      ...user,
      name: editForm.name,
      email: editForm.email,
      bio: editForm.bio
    });
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="cover-photo">
            <button className="edit-cover-btn">
              Edit Cover
            </button>
          </div>
          
          <div className="profile-info">
            <div className="profile-header-content">
              <div className="avatar-container">
                <img src={user.avatar} alt="Profile" className="avatar-img" />
                <div className="avatar-overlay">
                  <span className="change-avatar">Change</span>
                </div>
              </div>
              
              <div className="user-details">
                {!isEditing ? (
                  <>
                    <h1 className="user-name">{user.name}</h1>
                    <p className="user-email">{user.email}</p>
                    <p className="join-date">Member since {user.joinDate}</p>
                    <p className="user-bio">{user.bio}</p>
                  </>
                ) : (
                  <div className="edit-form">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bio</label>
                      <textarea 
                        name="bio"
                        value={editForm.bio}
                        onChange={handleEditChange}
                        rows="3"
                        className="form-textarea"
                      ></textarea>
                    </div>
                    <div className="form-buttons">
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        onClick={handleEditSubmit}
                        className="save-btn"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="edit-profile-btn"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-value">{user.stats.uploads}</div>
                <div className="stat-label">Uploads</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.stats.favorites}</div>
                <div className="stat-label">Favorites</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.stats.followers}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.stats.following}</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            <nav className="tabs-nav">
              <button 
                onClick={() => setActiveTab('galleries')}
                className={`tab-btn ${activeTab === 'galleries' ? 'active-tab' : ''}`}
              >
                Your Galleries
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`tab-btn ${activeTab === 'favorites' ? 'active-tab' : ''}`}
              >
                Favorites
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`tab-btn ${activeTab === 'activity' ? 'active-tab' : ''}`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`tab-btn ${activeTab === 'settings' ? 'active-tab' : ''}`}
              >
                Settings
              </button>
            </nav>
          </div>

          <div className="tab-content">
            {activeTab === 'galleries' && (
              <div className="galleries-tab">
                <div className="tab-header">
                  <h2 className="tab-title">Your Galleries</h2>
                  <button className="create-gallery-btn">
                    Create New Gallery
                  </button>
                </div>
                
                <div className="galleries-grid">
                  {user.galleries.map(gallery => (
                    <div key={gallery.id} className="gallery-card">
                      <div className="gallery-thumbnail">
                        <div className="gallery-title-overlay">
                          <h3 className="gallery-title">{gallery.name}</h3>
                        </div>
                      </div>
                      <div className="gallery-details">
                        <div className="gallery-stats">
                          <span>{gallery.artworks} artworks</span>
                          <span>{gallery.views} views</span>
                        </div>
                        <div className="gallery-actions">
                          <button className="view-gallery-btn">View Gallery</button>
                          <button className="edit-gallery-btn">Edit</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="favorites-tab">
                <h2 className="tab-title">Your Favorite Artworks</h2>
                <p className="tab-description">These are artworks you've marked as favorites.</p>
                <div className="favorites-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                    <div key={item} className="favorite-artwork"></div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-tab">
                <h2 className="tab-title">Recent Activity</h2>
                
                <div className="activity-list">
                  <div className="activity-item create-gallery">
                    <p className="activity-text">You created a new gallery <span className="activity-highlight">Contemporary Photography</span></p>
                    <p className="activity-time">2 days ago</p>
                  </div>
                  <div className="activity-item upload">
                    <p className="activity-text">You uploaded 3 new artworks to <span className="activity-highlight">Modern Abstracts</span></p>
                    <p className="activity-time">1 week ago</p>
                  </div>
                  <div className="activity-item milestone">
                    <p className="activity-text">Your gallery <span className="activity-highlight">Renaissance Masterpieces</span> reached 100 views</p>
                    <p className="activity-time">2 weeks ago</p>
                  </div>
                  <div className="activity-item follow">
                    <p className="activity-text">You followed the curator <span className="activity-highlight">ArtHistory101</span></p>
                    <p className="activity-time">3 weeks ago</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-tab">
                <h2 className="tab-title">Account Settings</h2>
                
                <div className="settings-sections">
                  <div className="settings-section">
                    <h3 className="section-title">Privacy</h3>
                    <div className="settings-options">
                      <div className="settings-option">
                        <div className="option-info">
                          <p className="option-title">Make profile public</p>
                          <p className="option-description">Allow others to view your profile and galleries</p>
                        </div>
                        <div className="toggle-switch active">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                      
                      <div className="settings-option">
                        <div className="option-info">
                          <p className="option-title">Show activity on feed</p>
                          <p className="option-description">Display your activity to followers</p>
                        </div>
                        <div className="toggle-switch">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="settings-section">
                    <h3 className="section-title">Notifications</h3>
                    <div className="settings-options">
                      <div className="settings-option">
                        <div className="option-info">
                          <p className="option-title">Email notifications</p>
                          <p className="option-description">Receive updates via email</p>
                        </div>
                        <div className="toggle-switch active">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                      
                      <div className="settings-option">
                        <div className="option-info">
                          <p className="option-title">New follower alerts</p>
                          <p className="option-description">Get notified when someone follows you</p>
                        </div>
                        <div className="toggle-switch active">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="settings-section">
                    <h3 className="section-title">Danger Zone</h3>
                    <div className="danger-zone">
                      <p className="danger-text">Once you delete your account, there is no going back. Please be certain.</p>
                      <button className="delete-account-btn">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;