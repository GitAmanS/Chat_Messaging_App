// chatRoutes.js
const express = require('express');
const chatController = require('../controllers/chatController');
const authController = require('../middleware/authentication');
const multerMiddleware = require('../middleware/multer');

const upload = multerMiddleware.multer.single('image');
const router = express.Router();

router.post('/post-message', authController.authorization, chatController.saveChatHistory);
router.post('/post-image', authController.authorization, upload, chatController.saveChatImages);
router.get('/get-message', authController.authorization, chatController.getUserChatHistory);
router.get('/get-messages', chatController.getAllChatHistory);

module.exports = router;
