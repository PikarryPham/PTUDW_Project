const catchAsync = require("../utils/catchAsync");
const {
    User,
    Course,
    Lesson,
    Video
} = require("../models");

exports.getIndexEditCourse = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;
    const user = await User.findById(req.user.id).lean();
    const course = await Course.findById({
        _id: idCourse,
        instructors: req.user.id
    }).lean();
    if (!course) {
        res.redirect("/profile")
        return;
    }

    res.render('instructors&admin/edit-course', {
        user,
        course,
        layout: false
    })
})

exports.getIndexLesson = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;
    const user = await User.findById(req.user.id).lean();
    const lessons = await Lesson.find({
        idCourse: idCourse
    }).populate({
        path: 'idCourse',
        match: {
            instructors: req.user.id,
        },
        select: 'instructors',
    }).lean()
    const course = await Course.findOne({
        _id: idCourse,
        instructors: req.user.id
    });
    if (!lessons || !course) {
        res.redirect("/profile")
        return;
    }
    res.render('instructors&admin/add-lesson', {
        user,
        layout: false,
        lessons,
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



// VIDEO

exports.getIndexAddVideo = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;
    const user = await User.findById(req.user.id).lean();
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
    res.render('instructors&admin/add-video', {
        user,
        layout: false,
        lessons,
        idCourse,
    })
})

exports.postAddVideo = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;

    const lessons = await Lesson.findById(req.body.idLesson);
    const course = await Course.findOne({
        _id: idCourse,
        instructors: req.user.id
    });
    if (!lessons || !course) {
        res.redirect("/profile")
        return;
    }
    req.body.isLooked = req.body.isLooked === 'true' ? true : false;
    req.body.pathUrl = req.file.path.split('/').slice(1).join('/');
    await Video.create(req.body);
    res.redirect('/profile')
})

exports.getDeleteCourse = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;
    const course = await Course.findOne({
        _id: idCourse,
        instructors: req.user.id
    });
    if (!course) {
        res.redirect('/profile');
        return;
    }
    course.active = false;
    await course.save();
    res.redirect('/profile')
})