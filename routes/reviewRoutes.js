const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router({
    mergeParams: true
});
const AuthController = require('../controllers/authController')
router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(
        AuthController.restrictTo('user'),
        reviewController.setCourseUserIds,
        reviewController.createReview
    )

module.exports = router;