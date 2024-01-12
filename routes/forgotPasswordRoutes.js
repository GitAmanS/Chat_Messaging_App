// forgotPasswordRoutes.js
const express = require('express');
const passwordController = require('../controllers/forgotPasswordController');

const router = express.Router();

router.post('/forgotpassword', passwordController.userResetPasswordMail);
router.get('/reset/:forgotId', passwordController.userResetPasswordform);
router.post('/password-reset', passwordController.userResetPassword);

module.exports = router;
