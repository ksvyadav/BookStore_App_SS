import Book from "../model/book.model.js";
import Order from "../model/order.model.js";

// Add a book
export const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update stock quantity
export const updateStock = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: { stockQuantity: req.body.stockQuantity } },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("books.bookId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
