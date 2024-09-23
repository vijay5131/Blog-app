const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username'); 
         // Populate author info
        //  console.log("test 1")
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new post (protected route)
router.post('/', auth, async (req, res) => {
    const { title, summary, content } = req.body;

    try {
        const user = await User.findById(req.user.userId);
        const post = new Post({
            title,
            summary,
            content,
            author: req.user.userId  // Link the post to the logged-in user
        });
        // console.log("post test 1");
        
        const newPost = await post.save();
        user.posts.push(newPost);
        await user.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a post by ID
router.put('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.author.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'User not authorized' });
        }
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a post (only by author)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.author.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Delete the post
        await Post.deleteOne({ _id: req.params.id });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
