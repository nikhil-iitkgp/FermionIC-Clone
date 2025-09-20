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
      address: 'Test Address, Test City, TC 12345',
      message: 'This is a test email to verify email service configuration. If you receive this, the email system is working correctly in the deployment environment!'
    };
    
    console.log('🧪 Sending test email...');
    const result = await sendContactNotification(testContactData);
    
    if (result.success) {
      console.log('✅ Test email sent successfully');
      res.status(200).json({ 
        success: true, 
        message: `Test email sent successfully via ${result.method}!`,
        method: result.method,
        messageId: result.messageId || 'N/A',
        details: result.message
      });
    } else {
      console.log('❌ Test email failed');
      res.status(200).json({ // Still return 200 to show the system is working
        success: false, 
        message: 'Test email had issues but system is functional',
        method: result.method || 'unknown',
        error: result.error,
        fallback: result.fallback,
        contactData: result.contactData
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

// @route  GET /api/contact/email-status
// @desc   Check email service status and configuration
router.get("/email-status", (req, res) => {
  console.log('📊 EMAIL STATUS CHECK');
  
  const status = {
    timestamp: new Date().toISOString(),
    environment: {
      isProduction: process.env.NODE_ENV === 'production',
      isRender: !!process.env.RENDER,
      nodeEnv: process.env.NODE_ENV || 'development'
    },
    emailConfig: {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      emailUser: process.env.EMAIL_USER ? process.env.EMAIL_USER.replace(/(.{3}).*(@.*)/, '$1***$2') : 'Not configured',
      hasDiscordWebhook: !!process.env.DISCORD_WEBHOOK_URL,
      forceHttpNotifications: process.env.FORCE_HTTP_NOTIFICATIONS === 'true'
    },
    strategies: [
      'Gmail SMTP (Primary)',
      'Discord Webhook (Fallback)',
      'Console Logging (Emergency Fallback)'
    ]
  };
  
  res.status(200).json(status);
});

module.exports = router;