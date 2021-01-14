const catchAsync = require("../utils/catchAsync");
const { User, Course, Orders } = require("../models");

exports.getIndexEditCourse = catchAsync(async (req, res, next) => {
  const { idCourse } = req.params;
  const user = await User.findById(req.user.id).lean();
  const course = await Course.findById({
    _id: idCourse,
    instructors: req.user.id,
  }).lean();
  if (!course) {
    res.redirect("/profile");
    return;
  }

  res.render("instructors/edit-course", {
    user,
    course,
    layout: false,
  });
});
exports.postEditCourse = catchAsync(async (req, res, next) => {
  const { idCourse } = req.params;
  const course = await Course.findById({
    _id: idCourse,
    instructors: req.user.id,
  });
  if (!course) {
    req.session.error = "Courses invalid please choose again !";
    res.redirect(`/instructor/course/${idCourse}`);
    return;
  }
  if (req.file) {
    // Windows .spilt("\\")
    req.body.imageCover = req.file.path.split("/").slice(1).join("/");
  }
  await course.updateOne(req.body);
  res.redirect(`/instructor/course/${idCourse}`);
});

exports.getDeleteCourse = catchAsync(async (req, res, next) => {
  const { idCourse } = req.params;
  const course = await Course.findOne({
    _id: idCourse,
    instructors: req.user.id,
  });
  if (!course) {
    res.redirect("/profile");
    return;
  }

  if (course.enrolled) {
    req.session.error = "Course have User do not delete Course";
    res.redirect("/profile");
    return;
  }
  course.active = false;
  await course.save();
  req.session.notification = "Delete Success Course";
  res.redirect("/profile");
});

exports.getCompleteCourse = catchAsync(async (req, res, next) => {
  const { idCourse } = req.params;
  const course = await Course.findOne({
    _id: idCourse,
    instructors: req.user.id,
  });
  if (!course) {
    req.session.error = "Course not invalid please type";
    res.redirect("/profile");
    return;
  }
  course.isCompleted = true;
  await course.save();
  req.session.notification = "Complete The Course Success !";
  res.redirect("/profile");
});
