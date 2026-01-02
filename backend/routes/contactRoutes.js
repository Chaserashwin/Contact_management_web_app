import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST - Create a new contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email, and phone are required" });
    }

    const contact = new Contact({ name, email, phone, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error creating contact" });
  }
});

// GET - Fetch all contacts (sorted by newest first)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// DELETE - Delete a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact" });
  }
});

export default router;
