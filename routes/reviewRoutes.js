const express = require('express');

const router = express.Router({
    mergeParams: true
});
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
router.use(authController.protect, authController.restrictTo('user'))
router
    .route('/')
    .get(reviewController.getIndexReviews)
    .post(
        reviewController.setCourseUserIds,
        reviewController.createReview
    )

module.exports = router;