const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: false,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: () => {
      return this.this.password != "";
    },
    minlength: 6,
  },
  dateRating: {
    type: Date,
    required: true,
    default: Date.now,
  },
  /**
   *
   */
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
