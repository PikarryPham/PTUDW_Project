const catchAsync = require("../utils/catchAsync");

const { User, Course, Orders, Lesson, Video } = require("../models/index");
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).lean();
  res.render("user-profile", {
    layout: false,
    user,
    error: req.session.error,
    notification: req.session.notification,
  });
  req.session.destroy();
});
// const filterObj = (obj, ...allowedFields) => {
//     const newObj = {};
//     Object.keys(obj).forEach(el => {
//         if (!allowedFields.includes(el)) newObj[el] = obj[el];
//     });
//     return newObj;
// };

exports.updateMe = async (req, res, next) => {
  try {
    // 1) Create error if users POTSs password data

    if (req.body.password || req.body.passwordConfirm) {
      res.redirect("/profile");
      req.session.error = "Do not Update password or password";
      return;
    }
    // 3) Update user document address

    await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    req.session.notification = "Update User Success fully";
    res.redirect("/profile");
  } catch (err) {
    req.session.error = "This email have user used";
    res.redirect("/profile");
  }
};

exports.getAddWishList = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.idCourse);
  if (!course) {
    res.redirect("/course");
    return;
  }
  await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: {
        wishCourse: course._id,
      },
    },
    {
      runValidators: true,
    }
  );
  res.redirect("/course");
});

exports.getAllWishListByUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate("wishCourse", "title _id ")
    .lean();
  res.render("wish-list", {
    layout: false,
    user,
  });
});
exports.deleteOneWishList = catchAsync(async (req, res, next) => {
  const { idCourse } = req.params;
  await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: {
        wishCourse: idCourse,
      },
    },
    {
      new: true,
    }
  );
  res.redirect("/profile");
});

exports.addCourses = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).lean();
  res.render("instructors/add-course", {
    user,
    layout: false,
  });
});

exports.getEnrolledCoursed = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).lean();
  // query
  const orders = await Orders.find({
    user: req.user.id,
  })
    .populate({
      path: "course",
      select: "_id title imageCover",
    })
    .lean();

  // Trick lua de giong nhu instructor // lay partials
  res.render("instructors/list-course", {
    layout: false,
    user,
    courses: orders,
  });
});

exports.getEnrolledLesson = catchAsync(async (req, res, next) => {
  const { idCourse } = req.params;

  const lessons = await Lesson.find({
    idCourse: idCourse,
  }).lean();

  const user = await User.findById(req.user.id).lean();
  res.render("learned/lesson", {
    layout: false,
    user,
    lessons,
    idCourse,
  });
});

exports.getEnrolledVideo = catchAsync(async (req, res, next) => {
  const { idLesson, idCourse } = req.params;
  const user = await User.findById(req.user.id).lean();
  const videos = await Video.find({
    idLesson,
  }).lean();
  res.render("learned/video", {
    layout: false,
    user,
    videos,
    idCourse,
    idLesson,
  });
});

exports.getEnrolledWatch = catchAsync(async (req, res, next) => {
  const { idLesson, idCourse, idVideo } = req.params;
  const user = await User.findById(req.user.id).lean();
  const videos = await Video.find({
    idLesson,
  }).lean();
  const video = await Video.findById(idVideo).lean();
  if (!video) {
    res.redirect("/profile");
    return;
  }
  res.render("learned/learnedCourse", {
    layout: false,
    videos,
    video,
    user,
    idCourse,
    idLesson,
  });
});
