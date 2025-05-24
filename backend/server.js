require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const galleryRoutes = require('./routes/galleryRoutes');
const artworkRoutes = require('./routes/artRoutes');
const Artwork = require('./models/Art');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    // Ensure directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// User Schema - Updated with profile fields
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  profilePicture: {
    type: String,
    default: ''
  },
  coverPhoto: {
    type: String,
    default: ''
  },
  stats: {
    uploads: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ msg: 'No token provided, access denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Static files - serve uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/galleries', galleryRoutes);
app.use('/api/artworks', artworkRoutes);

// Image upload route
app.post('/api/upload', verifyToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      msg: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ msg: 'Error uploading image' });
  }
});

// Multiple image upload route (for galleries)
app.post('/api/upload/multiple', verifyToken, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => ({
      imageUrl: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    }));
    
    res.json({
      msg: 'Images uploaded successfully',
      images: imageUrls
    });

  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ msg: 'Error uploading images' });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Art Museum API is running!' });
});

// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        msg: 'Please provide all required fields: firstName, lastName, email, password' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        msg: 'Password must be at least 6 characters long' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        msg: 'Please provide a valid email address' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        msg: 'User with this email already exists' 
      });
    }

    // Create new user
    const newUser = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password
    });

    await newUser.save();
    console.log('User created successfully:', newUser.email);

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      msg: 'Account created successfully!',
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      msg: 'Server error during registration. Please try again.',
      error: error.message
    });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        msg: 'Please provide both email and password' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ 
        msg: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        msg: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      msg: 'Login successful!',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      msg: 'Server error during login. Please try again.' 
    });
  }
});

// Get current user profile
app.get('/api/auth/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    // Get user's artwork count
    const artworkCount = await Artwork.countDocuments({ artist: req.user._id });
    
    // Update stats
    user.stats.uploads = artworkCount;
    await user.save();

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        coverPhoto: user.coverPhoto,
        stats: user.stats,
        joinDate: user.createdAt
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ msg: 'Server error fetching profile' });
  }
});

// Update user profile
app.put('/api/auth/profile', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (firstName) user.firstName = firstName.trim();
    if (lastName) user.lastName = lastName.trim();
    if (bio !== undefined) user.bio = bio.trim();
    
    await user.save();
    
    res.json({
      msg: 'Profile updated successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        coverPhoto: user.coverPhoto,
        stats: user.stats,
        joinDate: user.createdAt
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ msg: 'Server error updating profile' });
  }
});

// Get user's artworks
app.get('/api/user/artworks', verifyToken, async (req, res) => {
  try {
    const artworks = await Artwork.find({ artist: req.user._id })
      .populate('artist', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json(artworks);
  } catch (error) {
    console.error('Error fetching user artworks:', error);
    res.status(500).json({ msg: 'Server error fetching artworks' });
  }
});

// Create artwork
app.post('/api/artworks', verifyToken, async (req, res) => {
  try {
    const { title, description, imageUrl, category, tags } = req.body;
    
    const artwork = new Artwork({
      title,
      description,
      imageUrl,
      category,
      tags: tags || [],
      artist: req.user._id
    });
    
    await artwork.save();
    await artwork.populate('artist', 'firstName lastName');
    
    // Update user's upload count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.uploads': 1 }
    });
    
    res.status(201).json({
      msg: 'Artwork uploaded successfully!',
      artwork
    });
    
  } catch (error) {
    console.error('Artwork creation error:', error);
    res.status(500).json({ msg: 'Server error creating artwork' });
  }
});

// Get all artworks (for gallery)
app.get('/api/artworks', async (req, res) => {
  try {
    const artworks = await Artwork.find()
      .populate('artist', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ msg: 'Server error fetching artworks' });
  }
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/artmuseum';
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('Created uploads directory at:', uploadsDir);
    }
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`CORS enabled for: http://localhost:3000`);
      console.log(`Uploads directory: ${uploadsDir}`);
      console.log(`Static files served from: /uploads`);
    });
    
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Connect to database
connectDB();