const express = require('express');
const router = express.Router({
    mergeParams: true
});
const videoController = require('../controllers/videoController')
const authController = require('../controllers/authController')


router.use(authController.protect, authController.restrictTo('admin', 'instructors'));
router.get('/', videoController.indexGetVideo);

module.exports = router;