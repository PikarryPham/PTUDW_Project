const {
    Review
} = require('../models/index')
const catchAsync = require("../utils/catchAsync");

exports.getIndexReviews = catchAsync(async (req, res, next) => {
    res.render('review-course', {
        idCourse: req.params.idCourse,
        layout: false
    });
})
exports.setCourseUserIds = (req, res, next) => {

    if (!req.body.tour) req.body.course = req.params.idCourse;
    if (!req.body.user) req.body.user = req.signedCookies.jwt;
    next();
};
exports.createReview = async (req, res, next) => {

    await Review.create(req.body);
    res.redirect('/profile');
}