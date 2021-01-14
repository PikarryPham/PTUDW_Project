const { Review, User } = require("../models/index");
const catchAsync = require("../utils/catchAsync");

exports.getIndexReviews = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).lean();
  res.render("review-course", {
    idCourse: req.params.idCourse,
    layout: false,
    user,
  });
});
exports.setCourseUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.course = req.params.idCourse;
  if (!req.body.user) req.body.user = req.signedCookies.jwt;
  next();
};
exports.createReview = async (req, res, next) => {
  try {
    await Review.create(req.body);
    res.redirect("/profile");
  } catch (err) {
    req.session.error = err.message;
    res.redirect("/profile");
  }
};
