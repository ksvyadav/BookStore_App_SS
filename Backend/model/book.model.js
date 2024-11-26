import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: String,
  title: String,
  price: Number,
  category: String,
  image: String,
  stockQuantity: { type: Number, required: true, default: 0 }, // New field
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
