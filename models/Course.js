const mongoose = require("mongoose");
const schemaOptions = require("./configModel");

const courseSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['IT', 'Business', 'Design', 'Languages', 'Marketing'],
    default: 'IT'
  },
  title: {
    type: String,
    required: [true, 'Course must have name'],
    unique: false,
    uppercase: true,
    trim: true,
    maxlength: [1000, 'A course name must have less or equal then 1000 characters'],
    minlength: [5, 'A course name must have more or equal then 5 characters']
  },
  instructors: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A Course must have name instructors']
  },
  duration: {
    type: Number,

  },
  enrolled: {
    type: Number,
    default: 0,
    min: [0, 'Enrolled must greater than or equal 0']
  },
  difficulty: {
    type: String,
    required: [true, 'A Course must have difficulty '],
    enum: {
      values: ['Beginners', 'Intermediate', 'Advanced'],
      message: 'Difficulty is either : Beginners, Intermediate, Advanced '
    }
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: [0, 'Ratting muse be above 0.0'],
    max: [5, 'Ratting muse be above 1.0']
  },
  price: {
    type: Number,
    required: true,
    min: [1, 'Price must greater or equal than 1']
  },

  imageCover: {
    type: String,
    required: [true, 'A course must have a cover image']
  },
  images: [String],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    maxlength: [1000, 'A course description must have less or equal then 1000 characters'],
    minlength: [5, 'A course description must have more or equal then 5 characters']
  },
  textDescription: {
    type: String,
    required: [true, 'A course must have text Description']
  },

}, schemaOptions);
courseSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'course',
  localField: '_id'
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'instructors',
    select: '-__v -_id -passwordChangedAt'
  }).populate({
    path: 'reviews',
    select: '-__v '
  });

  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;