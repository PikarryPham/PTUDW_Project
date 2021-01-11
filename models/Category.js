const mongoose = require("mongoose");
const schemaOptions = require("./configModel");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category must have name"],
    },
  },
  schemaOptions
);

const category = mongoose.model("Category", categorySchema);
module.exports = category;
