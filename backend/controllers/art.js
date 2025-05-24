const Artwork = require('../models/Art');
const Gallery = require('../models/Gallery');

exports.createArtwork = async (req, res) => {
  try {
    const { title, artist, year, medium, description, galleryId, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const artwork = new Artwork({
      title,
      artist,
      year,
      medium,
      description,
      gallery: galleryId,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      imageUrl
    });

    const savedArtwork = await artwork.save();

    // Add artwork to gallery if specified
    if (galleryId) {
      await Gallery.findByIdAndUpdate(galleryId, {
        $push: { artworks: savedArtwork._id }
      });
    }

    res.status(201).json(savedArtwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().populate('gallery');
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};