const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    ref: 'User'
  },
  year: {
    type: String,
    trim: true
  },
  medium: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  gallery: {  // This should match what you're trying to populate
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery'
  },
  tags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Artwork', artworkSchema);