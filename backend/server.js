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

// Simple rate limiter middleware (no additional dependencies)
const requestCounts = {};
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // 5 requests per IP per 15 minutes window

const simpleRateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Clean up old entries every hour
  if (!requestCounts[ip]) {
    requestCounts[ip] = {
      count: 1,
      resetTime: Date.now() + WINDOW_MS
    };
  } else if (Date.now() > requestCounts[ip].resetTime) {
    // Reset if the time window has passed
    requestCounts[ip] = {
      count: 1,
      resetTime: Date.now() + WINDOW_MS
    };
  } else {
    // Increment count within the window
    requestCounts[ip].count += 1;
  }
  
  // Check if rate limit is exceeded
  if (requestCounts[ip].count > MAX_REQUESTS) {
    return res.status(429).json({ 
      status: 'error',
      message: 'Too many requests, please try again later.' 
    });
  }
  
  next();
};

// Middlewares
// Configure CORS to allow requests from both the deployed frontend and localhost
app.use(cors({
  origin: [
    'https://portfolio-taupe-two-ivi4t6cgf8.vercel.app', 
    'http://localhost:8080',
    'http://192.168.1.64:8080'  
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "10kb" })); // parse JSON bodies

// API routes
app.use("/api/contact", simpleRateLimiter, contactRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "success", 
    message: "Server is running",
    environment: process.env.NODE_ENV || "development"
  });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
