import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 4000;

// Connect Database & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// CORS Configuration (Production Safe)
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend URL from .env
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Handle Preflight Requests
app.options("*", cors());

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("Express server is running!");
});

// Global Error Handler (Optional but Recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
