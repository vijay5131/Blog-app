const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();

// Middleware
// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);  // Use authentication routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
