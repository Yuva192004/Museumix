const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/art');
const upload = require('../config/multer');

router.post('/', upload.single('image'), artworkController.createArtwork);
router.get('/', artworkController.getAllArtworks);

module.exports = router;