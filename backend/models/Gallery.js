const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  curator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  artworks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);