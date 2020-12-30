const express = require('express');
const router = express.Router({
    mergeParams: true
});
const videoController = require('../controllers/videoController')
const AuthController = require('../controllers/authController')
router.use(AuthController.protect, AuthController.restrictTo('admin', 'instructors'));
router.get('/', videoController.indexGetVideo)