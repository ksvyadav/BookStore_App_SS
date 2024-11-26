import express from "express";
import { verifySessionToken } from "../middleware/verifySessionToken.js";
import {
  addBook,
  deleteBook,
  updateStock,
  getOrders,
} from "../controller/admin.controller.js";

const adminRouter = express.Router();

// Add a book (Admin-only)
adminRouter.post(
  "/books",
  (req, res, next) => {
    req.requiredRole = "admin"; // Set required role for the middleware
    next();
  },
  verifySessionToken,
  addBook
);

// Delete a book (Admin-only)
adminRouter.delete(
  "/books/:id",
  (req, res, next) => {
    req.requiredRole = "admin";
    next();
  },
  verifySessionToken,
  deleteBook
);

// Update stock quantity (Admin-only)
adminRouter.put(
  "/books/:id",
  (req, res, next) => {
    req.requiredRole = "admin";
    next();
  },
  verifySessionToken,
  updateStock
);

// Get all orders (Admin-only)
adminRouter.get(
  "/orders",
  (req, res, next) => {
    req.requiredRole = "admin";
    next();
  },
  verifySessionToken,
  getOrders
);

export default adminRouter;
