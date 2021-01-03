const express = require('express');
const router = express.Router({
    mergeParams: true
});
const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
})
const videoController = require('../controllers/videoController')
const authController = require('../controllers/authController')
router.use(authController.protect, authController.restrictTo('admin', 'instructors'));
router.route('/').get(videoController.getIndexAddVideo)
    .post(upload.single('pathUrl'), videoController.postAddVideo);

module.exports = router;