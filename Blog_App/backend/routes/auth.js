const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth =require ('../middleware/auth')
const User = require('../models/User');
const router = express.Router();

// Define the /auth/me route
router.get('/me', auth, async (req, res) => {
    try {
      // Find the user in the database using the user ID from the token (req.user contains the decoded token payload)
      const user = await User.findById(req.user.userId).select('-password'); // Exclude the password field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send back the user details
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Register new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login existing user
router.post('/login', async (req, res) => {
    // console.log("login test");
    
    const { email, password } = req.body;
    // console.log(req.body);
    

    try {
        const user = await User.findOne({ email });
        if (!user) {
            // console.log("invlaid login test 1");
            
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        // console.log("valid test 2");
        // console.log(token);
        
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
