const express = require('express');
const courseController = require('../controllers/courseController');
const reviewRouter = require('./reviewRoutes');
const orderRouter = require('./orderRoutes');
const router = express.Router();
router.use('/:courseId/orders', orderRouter)
router.use('/:courseId/reviews', reviewRouter);
router
    .get("/", courseController.getAllCourses)
router.get("/:id/", courseController.getOneCourse)
module.exports = router;