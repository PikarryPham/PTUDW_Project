const mongoose = require("mongoose");

const CategoryCourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: () => {
      return this.name != "";
    },
  },
  childCate: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

const Category = mongoose.model("Category", CategoryCourseSchema);
module.exports = Category;
