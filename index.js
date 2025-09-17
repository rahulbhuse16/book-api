import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import bookRouter from "./router/book.route.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
  res.send("📚 Book API is running...");
});

dotenv.config();

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
