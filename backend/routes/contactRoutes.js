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
          if (result.method === 'http_fallback' || result.method === 'http_direct') {
            console.log('📧 HTTP notification sent successfully (SMTP bypassed/blocked)');
          } else {
            console.log('📧 Email notification sent successfully:', result.messageId);
          }
        } else {
          console.error('📧 Email notification failed:', result.error);
          if (result.fallback) {
            console.log('📋 Contact data logged for manual processing');
          }
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

// @route  POST /api/contact/test-email
// @desc   Test email configuration
router.post("/test-email", async (req, res) => {
  console.log('🧪 EMAIL TEST ROUTE HIT!');
  
  try {
    const testContactData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+1234567890',
      address: 'Test Address',
      message: 'This is a test email to verify email service configuration.'
    };
    
    console.log('🧪 Sending test email...');
    const result = await sendContactNotification(testContactData);
    
    if (result.success) {
      console.log('✅ Test email sent successfully');
      res.status(200).json({ 
        success: true, 
        message: 'Test email sent successfully!',
        messageId: result.messageId 
      });
    } else {
      console.log('❌ Test email failed');
      res.status(500).json({ 
        success: false, 
        message: 'Test email failed',
        error: result.error 
      });
    }
  } catch (error) {
    console.error('🧪 Test email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Test email error',
      error: error.message 
    });
  }
});

module.exports = router;