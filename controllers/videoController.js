const catchAsync = require("../utils/catchAsync")
const {
    User
} = require("../models/index");
const Lesson = require("../models/Lesson");

exports.indexGetVideo = catchAsync(async (req, res, next) => {
    const {
        idCourse
    } = req.params;
    const user = await User.findById(req.user.id).lean();
    const lessons = await Lesson.find({
        idCourse
    }).lean()

    res.render('instructors&admin/add-video', {
        layout: false,
        user,
        lessons
    })
})