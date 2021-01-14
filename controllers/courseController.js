const catchAsync = require("../utils/catchAsync");

const APIFeatures = require("../utils/apiFeatures");
const { Course, User, Review, Lesson, Orders } = require("../models/index");

exports.getAllCourses = catchAsync(async (req, res, next) => {
  let features;
  const user = await User.findById(req.signedCookies.jwt).lean();
  if (req.query.title) {
    features = new APIFeatures(Course.find(), req.query)
      .findByTitle()
      .sort()
      .paginate();
  } else if (req.query.category) {
    features = new APIFeatures(Course.find(), req.query)
      .paginate()
      .findByCategory();
  } else {
    features = new APIFeatures(Course.find(), req.query).paginate();
  }

  let courseWait = await features.query.lean();
  let courses = courseWait.map(course => {
    course.ratingsAverage =
      course.reviews.reduce((prev, acc) => (prev += acc.rating), 0) /
        course.reviews.length || 0;
    course.lengthReviews = course.reviews.length;
    return course;
  });

  if (req.query.sort === "rating") {
    courses = courses.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  }

  //atCourse để chứung minh nó ở router course để render nav
  res.render("course", {
    length: courses.length,
    courses,
    atCourse: true,
    user,
    query: req.query,
  });
});
exports.getOneCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(req.signedCookies.jwt).lean();
  const course = await Course.findByIdAndUpdate(id, {
    $inc: {
      onViewed: 1,
    },
  })
    .populate({
      path: "instructors",
      select: "+description",
    })
    .lean();
  course.ratingsAverage =
    course.reviews.reduce((prev, acc) => (prev += acc.rating), 0) /
      course.reviews.length || 0;
  course.lengthReviews = course.reviews.length;
  const isEnrolled = await Orders.findOne({
    user: req.signedCookies.jwt,
    course: id,
  }).lean();
  const lessons = await Lesson.find({
    idCourse: id,
  })
    .populate({
      path: "videos",
      select: "-created_at -updated_at -__v ",
    })
    .lean();
  const bestSaleEqualCategory = await Course.find({
    category: course.category,
  })
    .sort({
      enrolled: -1,
    })
    .limit(4)
    .lean();
  const reviews = await Review.aggregate([
    {
      $match: {
        course: course._id,
      },
    },
    {
      $group: {
        _id: {
          course: "$course",
          rating: "$rating",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: "$_id.course",
        counts: {
          $push: {
            rating: "$_id.rating",
            count: "$count",
          },
        },
      },
    },
  ]);

  res.render("single-course", {
    user,
    reviews: reviews.length ? reviews[0].counts : [],
    course,
    lessons,
    isEnrolled,
    bestSaleEqualCategory,
  });
});

exports.addOneCourse = async (req, res, next) => {
  try {
    req.body.instructors = req.user.id;
    // Windows .spilt("\\")
    console.log(req.body.imageCover);
    req.body.imageCover = req.file.path.split("\\").slice(1).join("/");
    const course = await Course.create(req.body);

    res.redirect(`/instructor/course/${course._id}/lesson`);
  } catch (err) {
    req.session.error = err.message;
    req.session.data = req.file.path.split("/").slice(1).join("/");
    res.redirect("/profile");
  }
};

exports.getAllCourseInstructors = catchAsync(async (req, res, next) => {
  const courses = await Course.find({
    instructors: req.user.id,
  })
    .select("+isCompleted")
    .lean();
  const user = await User.findById(req.user.id).lean();
  res.render("instructors/list-course", {
    courses,
    user,
    layout: false,
  });
});
