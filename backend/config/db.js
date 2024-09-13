const mongoose = require("mongoose");

let cachedDb = null;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set");
}

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    cachedDb = conn.connection.db;
    console.log("MongoDB connected...");
    return cachedDb;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;