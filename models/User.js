const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']

  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['user', 'instructors', 'admin'],
    default: 'user'
  },

  password: {
    type: String,
    required: [true, 'Please provide by password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works CREATE on SAVE !!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createAt: {
    type: Date,
    default: new Date(),
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  wishCourse: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;