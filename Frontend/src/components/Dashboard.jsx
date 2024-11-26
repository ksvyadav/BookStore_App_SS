import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../url";
import { useAuthStore } from "../store/authStore.js";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: "",
    title: "",
    price: "",
    category: "",
    image: "",
    stockQuantity: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/orders`, {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (error) {
        toast.error("Error fetching orders: " + error.response?.data?.message);
        navigate("/");
      }
    };

    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${baseUrl}/book`);
        setBooks(res.data);
      } catch (error) {
        toast.error("Error fetching books: " + error.response?.data?.message);
      }
    };

    fetchOrders();
    fetchBooks();
  }, [navigate]);

  // Add a new book
  const handleAddBook = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/admin/books`, newBook, {
        withCredentials: true,
      });
      setBooks([...books, res.data]);
      toast.success("Book added successfully!");
      setLoading(false);
      setNewBook({
        name: "",
        title: "",
        price: "",
        category: "",
        image: "",
        stockQuantity: "",
      });
    } catch (error) {
      setLoading(false);
      toast.error("Error adding book: " + error.response?.data?.message);
    }
  };

  // Delete a book
  const handleDeleteBook = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${baseUrl}/admin/books/${id}`, {
        withCredentials: true,
      });
      setBooks(books.filter((book) => book._id !== id));
      toast.success("Book deleted successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error deleting book: " + error.response?.data?.message);
    }
  };

  // Update stock quantity
  const handleUpdateStock = async (id, stockQuantity) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${baseUrl}/admin/books/${id}`,
        { stockQuantity },
        { withCredentials: true }
      );
      setBooks(
        books.map((book) =>
          book._id === id
            ? { ...book, stockQuantity: res.data.stockQuantity }
            : book
        )
      );
      toast.success("Stock updated successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error updating stock: " + error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome {user.fullname}! </h1>

        {/* Orders Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Orders</h2>
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">User</th>
                <th className="border-b px-4 py-2">Books Ordered</th>
                <th className="border-b px-4 py-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border-b px-4 py-2">
                    {order.userId.fullname}
                  </td>
                  <td className="border-b px-4 py-2">
                    {order.books.map((book) => book.bookId.name).join(", ")}
                  </td>
                  <td className="border-b px-4 py-2">₹{order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Books Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Books Management</h2>
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Stock</th>
                <th className="border-b px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="border-b px-4 py-2">{book.name}</td>
                  <td className="border-b px-4 py-2">
                    <input
                      type="number"
                      value={book.stockQuantity}
                      onChange={(e) =>
                        handleUpdateStock(
                          book._id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add Book Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBook();
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newBook.name}
                onChange={(e) =>
                  setNewBook({ ...newBook, name: e.target.value })
                }
                className="border px-2 py-1"
              />
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                className="border px-2 py-1"
              />
              <input
                type="number"
                placeholder="Price"
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
                className="border px-2 py-1"
              />
              <input
                type="text"
                placeholder="Category"
                value={newBook.category}
                onChange={(e) =>
                  setNewBook({ ...newBook, category: e.target.value })
                }
                className="border px-2 py-1"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newBook.image}
                onChange={(e) =>
                  setNewBook({ ...newBook, image: e.target.value })
                }
                className="border px-2 py-1"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={newBook.stockQuantity}
                onChange={(e) =>
                  setNewBook({ ...newBook, stockQuantity: e.target.value })
                }
                className="border px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 mt-4"
            >
              {loading ? <Loader className="animate-spin" /> : "Add Book"}
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
