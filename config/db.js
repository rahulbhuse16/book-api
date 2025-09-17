import mongoose from "mongoose";

import dotnev from 'dotenv'

dotnev.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/bookdb");
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
