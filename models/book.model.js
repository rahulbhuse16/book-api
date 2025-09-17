import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    status: { type: String, enum: ["Available", "Issued"], default: "Available" }
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
