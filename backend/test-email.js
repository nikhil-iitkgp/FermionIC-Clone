const { sendContactNotification } = require('./utils/emailService');
require('dotenv').config();

// Test email functionality
const testEmail = async () => {
  console.log('🧪 Testing email functionality...\n');
  
  const testContactData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+1234567890',
    address: '123 Test Street, Test City, TC 12345',
    message: 'This is a test message to verify that the email service is working correctly. If you receive this email, the system is functioning properly!'
  };
  
  try {
    console.log('📧 Sending test notification...');
    const result = await sendContactNotification(testContactData);
    
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    console.log('Success:', result.success);
    console.log('Method:', result.method);
    console.log('Message:', result.message);
    
    if (result.messageId) {
      console.log('Message ID:', result.messageId);
    }
    
    if (result.error) {
      console.log('Error:', result.error);
    }
    
    if (result.data) {
      console.log('Data:', JSON.stringify(result.data, null, 2));
    }
    
    console.log('\n✅ Test completed!');
    
    if (result.success) {
      console.log('🎉 Email service is working! Check your email: nikhilrajiitkgp@gmail.com');
    } else {
      console.log('⚠️ Email service had issues, but contact data was preserved.');
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
};

// Run the test
testEmail();
