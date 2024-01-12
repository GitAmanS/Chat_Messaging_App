// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../middleware/authentication');
const multerMiddleware = require('../middleware/multer');
const mainPagecontroler = require('../controllers/mainPageController')

const router = express.Router();

router.post('/signup', userController.userSignUp);
router.post('/signin', userController.userSignIn);
router.get('/get-users', authController.authorization, userController.getAllUser);
router.get('/get-user', authController.authorization, userController.getCurrentUser);
router.get('/',authController.authorization, mainPagecontroler.getMainpage)

module.exports = router;


// const express = require('express');
// const userControler = require('../controllers/user')
// const passwordController = require('../controllers/forgotPassword')
// const mainPagecontroler = require('../controllers/mainPage')
// const authController = require('../middleware/authentication')
// const multerMiddleware = require('../middleware/multer')
// const upload = multerMiddleware.multer.single('image');
// const router = express.Router();

// router.post('/signup',userControler.userSignUp);
// router.post('/signin',userControler.userSignIn);
// router.post('/forgotpassword',passwordController.userResetPasswordMail)
// router.get('/reset/:forgotId', passwordController.userResetPasswordform)
// router.post('/password-reset',passwordController.userResetPassword)

// router.post('/post-message',authController.authorization,userControler.saveChatHistory)
// router.post('/post-image',authController.authorization,upload,userControler.saveChatImages)
// router.get('/get-message',authController.authorization,userControler.getUserChatHistory);
// router.get('/get-users',authController.authorization,userControler.getAllUser)
// router.get('/get-user',authController.authorization,userControler.getCurrentUser)
// router.get('/get-messages',userControler.getAllChatHistory);
// router.post('/create-group',authController.authorization,userControler.createGroup)
// router.post('/update-group',authController.authorization,userControler.updateGroup)
// router.get('/get-groups',userControler.getAllGroups)
// router.get('/get-mygroups',authController.authorization,userControler.getMyGroups)
// router.get('/get-group',userControler.getGroupbyId)
// router.get('/get-group-messages',userControler.getGroupChatHistory)
// router.get('/get-group-members',userControler.getGroupMembersbyId)
// router.get('/',authController.authorization, mainPagecontroler.getMainpage)
// module.exports = router;