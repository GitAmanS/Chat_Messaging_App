// routes/chat.js
const express = require('express');
const { Op } = require('sequelize');
const { authenticateSocket } = require('../middleware/authMiddleware');
const ChatMessage = require('../models/ChatMessage');

const router = express.Router();



module.exports = router;
