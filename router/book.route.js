import { Router } from "express";
import { getBooks, getBookById, updateBook, deleteBook, searchBooks, createBook } from "../controllers/book.controller.js";

const bookRouter = Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/search", searchBooks);   // 🔎 Search endpoint
bookRouter.get("/:id", getBookById);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
