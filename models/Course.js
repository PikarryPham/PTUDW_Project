const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: () => {
      return this.name != "";
    },
  },
  content: {
    type: String,
    required: () => {
      return this.content != "";
    },
  },
  description: {
    type: String,
    required: () => {
      return this.description != "";
    },
  },
  numOfStudentRating: {
    type: Number,
    required: false,
    default: 0,
  },
  numOfStudentRegister: {
    type: Number,
    required: false,
    default: 0,
  },
  basicPrice: {
    type: Number,
    required: true,
    min: 9,
  },
  lastUpdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  postDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: Number,
    required: () => {
      return this.status != "";
    },
  },
  img: {
    type: String,
    required: false,
  },
  salePrice: {
    type: Number,
    required: true,
    min: 9,
  },
  beRegisted: [
    {
      /**
       * Date registed??? nen luu ntn
       */
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  beLoved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  beTeached: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  /**
   * Rated???
   */
  include: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
});

const User = mongoose.model("Course", courseSchema);

module.exports = Course;
