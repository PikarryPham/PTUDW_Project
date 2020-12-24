const Review = require("../models/Reviews");

exports.getReviews = (req, res, next) => {

}
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