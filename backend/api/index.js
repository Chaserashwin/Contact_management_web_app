import mongoose from "mongoose";
import cors from "cors";

// MongoDB Connection
let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI not defined");
    }

    const connection = await mongoose.connect(mongoUri);
    isConnected = connection.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

// Define Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// CORS Middleware
const corsMiddleware = cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL || "",
  ].filter(Boolean),
  credentials: true,
});

// API Handler
export default async function handler(req, res) {
  await connectDB();

  // Apply CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Extract route from URL
  const path = req.url.replace("/api", "");

  try {
    // POST - Create a new contact
    if (req.method === "POST" && path === "/contacts") {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !phone) {
        return res
          .status(400)
          .json({ message: "Name, email, and phone are required" });
      }

      try {
        const contact = new Contact({ name, email, phone, message });
        await contact.save();
        return res.status(201).json(contact);
      } catch (error) {
        if (error.name === "ValidationError") {
          return res.status(400).json({ message: error.message });
        }
        throw error;
      }
    }

    // GET - Fetch all contacts
    if (req.method === "GET" && path === "/contacts") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json(contacts);
    }

    // DELETE - Delete a contact by ID
    if (req.method === "DELETE" && path.startsWith("/contacts/")) {
      const id = path.replace("/contacts/", "");
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      return res.status(200).json({ message: "Contact deleted successfully" });
    }

    // Route not found
    return res.status(404).json({ message: "Route not found" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
