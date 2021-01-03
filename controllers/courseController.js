const catchAsync = require("../utils/catchAsync");

const APIFeatures = require('../utils/apiFeatures');
const {
    Course,
    User,
    Review,
    Lesson,
    Orders
} = require('../models/index');


exports.getAllCourses = catchAsync(async (req, res, next) => {


    let features;
    const user = await User.findById(req.signedCookies.jwt).lean();
    if (req.query.title) {
        features = new APIFeatures(Course.find(), req.query).findByTitle().sort()
    } else if (req.query.category) {
        features = new APIFeatures(Course.find(), req.query).findByCategory()
    } else {
        features = new APIFeatures(Course.find(), req.query)
    }
    const courses = await features.query.lean();
    //atCourse để chứung minh nó ở router course để render nav
    res.render('course', {
        length: courses.length,
        courses,
        atCourse: true,
        user,
    })


})
exports.getOneCourse = catchAsync(async (req, res, next) => {

    const {
        id
    } = req.params;
    const user = await User.findById(req.signedCookies.jwt).lean();
    const course = await Course.findById(id).lean();
    course.ratingsAverage = course.reviews.reduce((prev, acc) => prev += acc.rating, 0) / course.reviews.length || 0;
    course.lengthReviews = course.reviews.length;
    const isEnrolled = await Orders.findOne({
        user: req.signedCookies.jwt,
        course: id
    }).lean();
    const lessons = await Lesson.find({
        idCourse: id
    }).populate({
        path: 'videos',
        select: '-created_at -updated_at -__v '
    }).lean()

    const reviews = await Review.aggregate([{
            $match: {
                course: course._id
            },
        },
        {
            $group: {
                _id: {
                    course: "$course",
                    rating: "$rating"
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $group: {
                _id: "$_id.course",
                counts: {
                    $push: {
                        rating: "$_id.rating",
                        count: "$count"
                    }
                }

            }
        },
    ])
    console.log(course)
    res.render('single-course', {
        user,
        reviews: reviews.length ? reviews[0].counts : [],
        course,
        lessons,
        isEnrolled
    })
})

exports.deleteOneCourses = catchAsync(async (req, res, next) => {

})

exports.addOneCourse = catchAsync(async (req, res, next) => {
    req.body.instructors = req.user.id
    req.body.imageCover = req.file.path.split('/').slice(1).join('/');
    const course = await Course.create(req.body)

    res.redirect(`/instructor/course/${course._id}/lesson`)
})

exports.getAllCourseInstructors = catchAsync(async (req, res, next) => {

    const courses = await Course.find({
        instructors: req.user.id
    }).lean();
    const user = await User.findById(req.user.id).lean()
    res.render('instructors&admin/list-course', {
        courses,
        user,
        layout: false
    })
})