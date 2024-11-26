import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
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
    default: "user", // Default role
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
