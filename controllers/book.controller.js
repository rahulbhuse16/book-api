import { Book } from "../models/book.model.js";
// Create Book
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Book created successfully", data: book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Books with Pagination
export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit);

    res.json({
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      data: books
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const searchBooks = async (req, res) => {
  try {
    const query = req.query.query || "";
    const genre = req.query.genre || "";   // filter by genre
    const status = req.query.status || ""; // filter by status
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Base search condition
    let searchCondition = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } }
      ]
    };

    // Add genre filter if provided
    if (genre) {
      searchCondition.genre = genre;
    }

    // Add status filter if provided
    if (status) {
      searchCondition.status = status;
    }

    const total = await Book.countDocuments(searchCondition);
    const books = await Book.find(searchCondition)
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      query,
      genre,
      status,
      data: books
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json({ message: "Book updated successfully", data: book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
