import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
// import { MongoClient, ServerApiVersion } from "mongodb";

// Configure dotenv before using process.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    // Check if connection is established and db is available
    if (mongoose.connection.readyState === 1) {
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);

      // Safely access db after ensuring connection
      const db = mongoose.connection.db;
      if (db) {
        const collections = await db.listCollections().toArray();
        console.log("Available collections:");
        collections.forEach((collection) => {
          console.log(` - ${collection.name}`);
        });
      }
    } else {
      throw new Error("MongoDB connection not ready");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
