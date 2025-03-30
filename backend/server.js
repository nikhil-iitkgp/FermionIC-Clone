const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parse JSON body

// CORS Setup
const allowedOrigins = [
  process.env.CLIENT_URL, // This should be set in Render's environment variables
  "http://localhost:5173", // For local development
  "https://fermionic-clone-1.onrender.com" // Your deployed frontend URL
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


// API Routes
app.use("/api/contact", require("./routes/contactRoutes"));

// Health Check Route (For Render)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
