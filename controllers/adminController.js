const catchAsync = require("../utils/catchAsync");
const {
    User,
    Course
} = require("../models");

exports.getIndexAdminProfile = catchAsync(async (req, res, next) => {
    const courses = await Course.find().lean()

    const user = await User.findById(req.signedCookies.jwt).lean()
    res.render('admin/admin', {
        layout: false,
        user,
        courses
    })
})
exports.getIndexAdminProfile = catchAsync(async (req, res, next) => {
    const courses = await Course.find().lean()

    const user = await User.findById(req.signedCookies.jwt).lean()
    res.render('admin/admin', {
        layout: false,
        user,
        courses
    })
})