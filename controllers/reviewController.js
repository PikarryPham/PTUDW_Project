const Review = require("../models/Reviews");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.courseId) filter = {
        course: req.params.courseId
    };
    const features = new APIFeatures(Review.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const reviews = await features.query;

    res.render('single-course', {
        reviews,
    });
})
exports.setCourseUserIds = (req, res, next) => {
    console.log('run at set course')
    if (!req.body.tour) req.body.course = req.params.courseId;
    if (!req.body.user) req.body.user = req.signedCookies.jwt;
    next();
};
exports.createReview = async (req, res, next) => {
    await Review.create(req.body);
    res.redirect('/course');
}