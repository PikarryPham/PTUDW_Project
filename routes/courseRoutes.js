const express = require('express');
const courseController = require('../controllers/courseController');
const reviewRouter = require('./reviewRoutes');
const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
})
const orderRouter = require('./orderRoutes');
const authController = require('../controllers/authController');
const router = express.Router();
router.use('/:courseId/orders', authController.protect, orderRouter)
router.use('/:courseId/reviews', reviewRouter);

router.route("/")
    .get(courseController.getAllCourses)
    .post(upload.single('imageCover'), authController.protect, authController.restrictTo('instructors', 'admin'), courseController.addOneCourse)
router.get("/:id/", courseController.getOneCourse)
module.exports = router;