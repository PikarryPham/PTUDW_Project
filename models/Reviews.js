// Review // rating // createdAt // ref to course // ref to user

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review is not is empty']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Rating must have rating ']
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a User.']
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'Review must belong to a course.']
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;