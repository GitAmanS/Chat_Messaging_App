// chatController.js
const ChatHistory = require('../models/chatHistory')
const awsService = require('../services/awsservices');
const User = require('../models/user');
const { Op } = require('sequelize');
exports.saveChatHistory = async (request, response, next) => {
    try {
        const user = request.user;
        const { message, GroupId } = request.body;
        if (GroupId == 0) {
            await user.createChatHistory({
                message,
            })
        } else {
            await user.createChatHistory({
                message,
                GroupId,
            })
        }

        return response.status(200).json({ message: "Message saved to database succesfully" })

    } catch (error) {
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}

exports.getUserChatHistory = async (request, response, next) => {
    try {
        const user = request.user;
        const chatHistories = await user.getChatHistories();
        return response.status(200).json({ chat: chatHistories, message: "User chat History Fetched" })

    } catch (error) {
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}
exports.getAllChatHistory = async (request, response, next) => {
    try {
        const lastMessageId = request.query.lastMessageId || 0;
        const chatHistories = await ChatHistory.findAll({
            include: [
                {
                    model: User,
                    attibutes: ['id', 'name', 'createdAt']
                }
            ],
            order: [['createdAt', 'ASC']],
            where: {
                GroupId: null,
                id: {
                    [Op.gt]: lastMessageId
                }
            }
        });
        const chats = chatHistories.map((ele) => {
            const user = ele.User;
            return {
                messageId: ele.id,
                message: ele.message,
                isMedia: ele.isMedia,
                name: user.name,
                userId: user.id,
                createdAt: ele.createdAt
            }
        })
        return response.status(200).json({ chats, message: "User chat History Fetched" })

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}

exports.saveChatImages = async (request, response, next) => {
    try {
        const user = request.user;
        const image = request.file;
        const { GroupId } = request.body;
        const filename = `chat-images/group${GroupId}/user${user.id}/${Date.now()}_${image.originalname}`;
        const imageUrl = await awsService.uploadToS3(image.buffer, filename)
        console.log(imageUrl)
        if (GroupId == 0) {
            await user.createChatHistory({
                message: imageUrl,
                isMedia: true
            })
        } else {
            await user.createChatHistory({
                message: imageUrl,
                GroupId,
                isMedia: true
            })
        }

        return response.status(200).json({ message: "image saved to database succesfully" })

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}