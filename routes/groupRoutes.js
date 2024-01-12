// groupRoutes.js
const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../middleware/authentication');

const router = express.Router();

router.post('/create-group', authController.authorization, groupController.createGroup);
router.post('/update-group', authController.authorization, groupController.updateGroup);
router.get('/get-groups', groupController.getAllGroups);
router.get('/get-mygroups', authController.authorization, groupController.getMyGroups);
router.get('/get-group', groupController.getGroupbyId);
router.get('/get-group-messages', groupController.getGroupChatHistory);
router.get('/get-group-members', groupController.getGroupMembersbyId);

module.exports = router;
