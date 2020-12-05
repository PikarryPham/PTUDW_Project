const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: () => {
      return this.name != "";
    },
  },
  linkURL: {
    type: String,
    required: () => {
      return this.name != "";
    },
  },
  status: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  beIncludedByChap: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
});

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
