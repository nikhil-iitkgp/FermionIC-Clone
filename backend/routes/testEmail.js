const express = require("express");
const router = express.Router();
const { sendContactNotification } = require("../utils/emailService");

// Test email route
router.post("/test-email", async (req, res) => {
  console.log('🧪 Testing email functionality...');
  
  const testContactData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "1234567890",
    address: "Test Address",
    message: "This is a test message to check if email notifications are working."
  };

  try {
    const result = await sendContactNotification(testContactData);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      res.status(200).json({ 
        success: true, 
        message: "Test email sent successfully!", 
        messageId: result.messageId 
      });
    } else {
      console.log('❌ Test email failed:', result.error);
      res.status(500).json({ 
        success: false, 
        message: "Test email failed", 
        error: result.error 
      });
    }
  } catch (error) {
    console.error('❌ Test email error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Test email error", 
      error: error.message 
    });
  }
});

module.exports = router;
