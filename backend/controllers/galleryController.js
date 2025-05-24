const Gallery = require('../models/Gallery');

exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find()
      .populate({
        path: 'artworks',
        select: 'title artist imageUrl year',
        options: { limit: 3 }
      })
      .populate({
        path: 'curator',
        select: 'firstName lastName'
      });
      
    res.status(200).json(galleries); // Send just the array
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
      .populate('artworks')
      .populate('curator', 'firstName lastName');
      
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: gallery
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid gallery ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};