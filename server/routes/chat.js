// routes/chat.js
const express = require('express');
const { Op } = require('sequelize');
const ChatMessage = require('../models/ChatMessage');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();


// POST route to add a chat message
router.post('/add', authenticate, async (req, res) => {
    try {
      const  userId  = await req.user.dataValues.id;
      console.log("user id:",userId) // Assuming the user ID is available in the token
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

// GET route to get all messages of a particular user with an ID greater than lastmsg
router.get('/getMessages/:id', authenticate, async (req, res) => {
  try {
    const userId = await req.user.dataValues.id;
    const lastmsg = req.params.id;

    // Retrieve all messages where the senderId is the current user's ID and the id is greater than lastmsg
    const userMessages = await ChatMessage.findAll({
      where: {
        senderId: userId,
        id: {
          [Op.gt]: lastmsg, // Use Sequelize's greater than operator
        },
      },
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json({ messages: userMessages });
  } catch (error) {
    console.error('Error fetching user messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  


module.exports = router;
