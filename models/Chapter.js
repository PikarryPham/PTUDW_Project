const mongoose = require("mongoose");

const chapterCourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: () => {
      return this.name != "";
    },
  },
  duringTime: {
    type: Number,
    required: false,
    min: 60,
  },
  document: [],
  video: [],
  beIncluded: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

const Chapter = mongoose.model("Chapter", chapterCourseSchema);
module.exports = Chapter;
