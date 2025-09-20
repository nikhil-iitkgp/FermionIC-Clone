const express = require("express");
const router = express.Router();
const Contact = require("../models/ContactModel");
const { sendContactNotification } = require("../utils/emailService");

// @route  POST /api/contact
// @desc   Save contact form data and send notification email
router.post("/", async (req, res) => {
  console.log('🔥 CONTACT FORM ROUTE HIT!');
  console.log('🔥 Request body:', req.body);
  
  try {
    const { firstName, lastName, email, phone, address, message } = req.body;
    
    console.log('🔥 Extracted data:', { firstName, lastName, email, phone, address, message });

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address || !message) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({ error: "All fields are required!" });
    }
    
    console.log('✅ All fields validated successfully');

    // Save to DB
    const newContact = new Contact({ firstName, lastName, email, phone, address, message });
    await newContact.save();

    // Send notification email (don't wait for it to complete)
    console.log('📝 Contact form submitted - preparing email notification...');
    const contactData = { firstName, lastName, email, phone, address, message };
    
    // Send email notification asynchronously
    sendContactNotification(contactData)
      .then(result => {
        if (result.success) {
          console.log('📧 Email notification sent successfully:', result.messageId);
        } else {
          console.error('📧 Email notification failed:', result.error);
        }
      })
      .catch(error => {
        console.error('📧 Email notification error:', error);
      });

    console.log('✅ Contact form data saved to database successfully');
    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: "Server error, try again later." });
  }
});

module.exports = router;