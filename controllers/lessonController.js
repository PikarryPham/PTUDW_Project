const {
    User,
    Course,
    Lesson
} = require('../models/index');
const catchAsync = require('../utils/catchAsync');

exports.getIndexLesson = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;
    const user = await User.findById(req.user.id).lean();
    const course = await Course.findOne({
        _id: idCourse,
        instructors: req.user.id
    });
    if (!course) {
        res.redirect("/profile")
        return;
    }
    res.render('instructors/add-lesson', {
        user,
        layout: false,
        idCourse,

    })
})
exports.postAddLesson = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;

    const lessons = await Lesson.find({
        idCourse: idCourse
    }).populate({
        path: 'idCourse',
        match: {
            instructors: req.user.id,
        },
        select: 'instructors',
    }).lean()
    const course = await Course.findById({
        _id: idCourse,
        instructors: req.user.id
    });
    if (!lessons || !course) {
        res.redirect("/profile")
        return;
    }
    req.body.idCourse = idCourse
    await Lesson.create(req.body);
    res.redirect(`/instructor/course/${idCourse}/video`)
})