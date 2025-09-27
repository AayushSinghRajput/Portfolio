// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

await connectDB(MONGO_URI);

// Middlewares
app.use(cors()); // adjust origin option in production
app.use(express.json({ limit: "10kb" })); // parse JSON bodies

// API routes
app.use("/api/contact", contactRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
