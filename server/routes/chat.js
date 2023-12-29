// routes/chat.js
const express = require('express');
const { Op } = require('sequelize');
const ChatMessage = require('../models/ChatMessage');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();


// POST route to add a chat message
router.post('/add', authenticate, async (req, res) => {
    try {
      const { userId } = req.user; // Assuming the user ID is available in the token
      const { message } = req.body;
  
      // Add the chat message to the database
      const newMessage = await ChatMessage.create({
        message,
        senderId: userId, // Set the sender ID from the token
      });
  
      res.status(201).json({ message: 'Chat message added successfully', data: newMessage });
    } catch (error) {
      console.error('Error adding chat message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;

module.exports = router;
