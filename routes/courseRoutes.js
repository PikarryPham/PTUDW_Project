const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const reviewRoutes = require('./reviewRoutes');

// const reviewRoutes = require('./reviewRoutes')
const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
})

const router = express.Router();
// router.use('/:courseId/orders', authController.protect, )
router.use('/:courseId/reviews', reviewRoutes);

router.route("/")
    .get(courseController.getAllCourses)
    .post(upload.single('imageCover'), authController.protect, authController.restrictTo('instructors', 'admin'), courseController.addOneCourse)
router.get("/:id/", courseController.getOneCourse)
module.exports = router;