const express = require('express');
const { registerUser, loginUser, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.put('/profile', protect, updateProfile);

module.exports = router;
