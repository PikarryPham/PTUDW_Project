const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const schemaOptions = require("./configModel");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "instructors", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide by password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // This only works CREATE on SAVE !!
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    description: {
      type: String,

      default: "I am the best Instructor",
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
      select: false,
    },
    wishCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: false,
      },
    ],
  },
  schemaOptions
);
// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'wishCourse',
//   });
//   next();
// });
userSchema.pre("save", async function (next) {
  // ONLY run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // HASH the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // DELETE PASSWORD confirm fields
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(this.passwordResetToken)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
