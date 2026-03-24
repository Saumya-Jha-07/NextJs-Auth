import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [5, "Username must contain atleast 5 characters"],
      maxlength: [15, "Username can have maximum 15 characters only!"],
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
    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: String,

    verifyToken: String,
    verifyTokenExpiry: Date,

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timestamps: true },
);

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
