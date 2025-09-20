require("dotenv").config(); // ✅ Load environment variables at the top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// CORS Setup
const allowedOrigins = [
  process.env.CLIENT_URL, 
  "http://localhost:5173",
  "https://siktasys.in",
  "https://www.siktasys.in",
  "https://fermionic-clone-1.onrender.com" // Keep old frontend during transition
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1);
  });

// API Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api", require("./routes/testEmail"));

// Health Check Route (For Render)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Error Handling Middleware
// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));