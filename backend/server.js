import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware - CORS configuration for local dev and production
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL || "",
  ].filter(Boolean),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection failed:", err));

// Import routes
import contactRoutes from "./routes/contactRoutes.js";

// Routes
app.use("/api/contacts", contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
