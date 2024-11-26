import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import bookRoute from "./routes/book.route.js";
import userRoute from "./routes/user.route.js";
import contactRoute from "./routes/contact.route.js";
import cartRoutes from "./routes/cart.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();

const _dirname = path.resolve();

app.use(
  cors({
    origin: "https://bookstore-app-ss.onrender.com", //https://bookstore-app-ss.onrender.com http://localhost:4001 http://localhost:5173
    credentials: true,
  })
); // for running backend and frontend and render backend data to frontend
app.use(express.json()); // to parse all the data received from body.
app.use(cookieParser()); //for parsing cookies
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.mongoDBURI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error :", error);
}

//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
