const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email); // Using validator.js for robust email validation
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    googleId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    facebookId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      next(err);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
