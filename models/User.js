const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: () => {
      return this.this.password != "";
    },
    minlength: 6,
  },
  name: {
    type: String,
    required: false,
  },
  typeOfUser: {
    type: Number,
    required: true,
  },
  dateRegister: {
    type: Date,
    required: false,
    default: null,
  },
  registed: [
    {
      /**
       * date registed?
       */
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  love: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  teach: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
