const express = require('express');
const mainPagecontroler = require('../controllers/mainPageController')
const router = express.Router();
router.get('/',mainPagecontroler.getHomepage);
router.use('/',mainPagecontroler.getErrorpage);

module.exports = router;