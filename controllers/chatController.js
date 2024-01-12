// chatController.js
const ChatHistory = require('../models/chat-history')
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
                    attibutes: ['id', 'name', 'date_time']
                }
            ],
            order: [['date_time', 'ASC']],
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
                isImage: ele.isImage,
                name: user.name,
                userId: user.id,
                date_time: ele.date_time
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
                isImage: true
            })
        } else {
            await user.createChatHistory({
                message: imageUrl,
                GroupId,
                isImage: true
            })
        }

        return response.status(200).json({ message: "image saved to database succesfully" })

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}