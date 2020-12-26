const express = require('express');
const courseController = require('../controllers/courseController');
const reviewRouter = require('./reviewRoutes');
const orderRouter = require('./orderRoutes');
const authController = require('../controllers/authController');
const router = express.Router();
router.use('/:courseId/orders', authController.protect, orderRouter)
router.use('/:courseId/reviews', reviewRouter);
router
    .get("/", courseController.getAllCourses)
router.get("/:id/", courseController.getOneCourse)
module.exports = router;