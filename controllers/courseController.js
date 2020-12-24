const catchAsync = require("../utils/catchAsync");
const Course = require("../models/Course");
const APIFeatures = require('../utils/apiFeatures');
exports.getAllCourses = catchAsync(async (req, res, next) => {
    let features;
    if (req.query.title) {
        features = new APIFeatures(Course.find({
            "title": {
                $regex: req.query.title.toLowerCase()
            }
        }), req.query)
    } else {
        features = new APIFeatures(Course.find(req.query), req.query)
    }
    const courses = await features.query.lean();
    //atCourse để chứung minh nó ở router course để render nav
    res.render('course', {
        length: courses.length,
        courses,
        atCourse: true,
    });
})
exports.getOneCourse = catchAsync(async (req, res, next) => {
    const {
        id
    } = req.params;
    const user = req.signedCookies.jwt;
    const course = await Course.findById(id).lean();

    res.render('single-course', {
        course,
        user,
    })
})