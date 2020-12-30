const express = require('express');

const router = express.Router({
    mergeParams: true
});
const {
    authController,
    reviewController
} = require('../controllers/index')
router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo('user'),
        reviewController.setCourseUserIds,
        reviewController.createReview
    )

module.exports = router;