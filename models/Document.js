const mongoose = require("mongoose");

const documentOfChapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: () => {
      return this.name != "";
    },
  },
  beIncludedInChapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
});

const Document = mongoose.model("Document", documentOfChapterSchema);
module.exports = Document;
