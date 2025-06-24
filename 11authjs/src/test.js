import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root (one level up from src)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log("✅ Loaded MONGODB_URI:", 
  process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//****:****@'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    // Verify connection
    return mongoose.connection.db.admin().ping();
  })
  .then(() => {
    console.log("🟢 Database ping successful");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Connection failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  });