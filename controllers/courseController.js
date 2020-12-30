const catchAsync = require("../utils/catchAsync");

const APIFeatures = require('../utils/apiFeatures');
const {
    Course,
    User,
    Review
} = require('../models/index')


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

    res.render('single-course', {
        user,
        reviews: reviews.length ? reviews[0].counts : [],
        course,
    })
})

exports.deleteOneCourses = catchAsync(async (req, res, next) => {

})

exports.addOneCourse = catchAsync(async (req, res, next) => {
    req.body.instructors = req.user.id
    req.body.imageCover = req.file.path.split('/').slice(1).join('/');
    await Course.create(req.body)
    console.log(req.body)
    res.redirect('/profile')
})