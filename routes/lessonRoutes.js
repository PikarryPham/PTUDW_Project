const express = require('express');
const router = express.Router({
    mergeParams: true
});
const lessonController = require('../controllers/lessonController')
const authController = require('../controllers/authController');
router.use(authController.protect, authController.restrictTo('instructors'))
router.route("/").get(lessonController.getIndexLesson).post(lessonController.postAddLesson)

module.exports = router;