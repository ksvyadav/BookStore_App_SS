import express from "express";
import {
  addToCart,
  getCartProducts,
  removeAllFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";
import { verifySessionToken } from "../middleware/verifySessionToken.js";

const router = express.Router();

router.get("/", verifySessionToken, getCartProducts);
router.post("/", verifySessionToken, addToCart);
router.delete("/", verifySessionToken, removeAllFromCart);
router.put("/:id", verifySessionToken, updateQuantity);

export default router;
