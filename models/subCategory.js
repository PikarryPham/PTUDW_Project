const mongoose = require("mongoose");

const SubCategoryCourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: () => {
      return this.name != "";
    },
  },
  parentCate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const SubCategory = mongoose.model("SubCategory", SubCategoryCourseSchema);
module.exports = SubCategory;
