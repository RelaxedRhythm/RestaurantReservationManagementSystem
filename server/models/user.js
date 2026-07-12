const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxjv0gq4f/image/upload/v1690245605/avatar/default-avatar_owzq3r.png",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
