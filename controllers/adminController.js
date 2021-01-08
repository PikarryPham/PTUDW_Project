const catchAsync = require("../utils/catchAsync");
const {
    User,
    Course
} = require("../models");
const Orders = require("../models/Orders");

exports.getIndexAdminProfile = catchAsync(async (req, res, next) => {
    const courses = await Course.find().lean()

    const user = await User.findById(req.signedCookies.jwt).lean()
    res.render('admin/courses', {
        layout: false,
        user,
        courses,
        error: req.session.error
    })
    req.session.destroy();
})
exports.getIndexUser = catchAsync(async (req, res, next) => {
    const users = await User.find({role: 'user'}).lean()
    const user = await User.findById(req.signedCookies.jwt).lean()
    res.render('admin/users', {
        layout: false,
        user,
        users
    })
})

exports.getIndexInstructor = catchAsync(async(req,res,next) => {
     const users = await User.find({role: 'instructors'}).lean()
    const user = await User.findById(req.signedCookies.jwt).lean()
    res.render('admin/users', {
        layout: false,
        user,
        users
    })
})
exports.deleteIndexUser = catchAsync(async(req,res,next) => {
    await User.findByIdAndDelete(req.params.idUser);
    res.redirect("/admin")
})
exports.deleteIndexCourse = catchAsync(async(req,res,next) => {
    const course = Orders.findOne({
        course: req.params.idCourse
    })
    if(course) {
        req.session.error = 'Course have User learning not delete'
        res.redirect('/admin')
        return;
    }
    await Course.findByIdAndDelete(req.params.idCourse);
    res.redirect("/admin")
})