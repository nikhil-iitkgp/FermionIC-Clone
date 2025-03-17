const express = require("express");
const router = express.Router();
const Contact = require("../models/ContactModel");

// @route  POST /api/contact
// @desc   Save contact form data
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Save to DB
    const newContact = new Contact({ firstName, lastName, email, phone, address, message });
    await newContact.save();

    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error, try again later." });
  }
});

module.exports = router;
