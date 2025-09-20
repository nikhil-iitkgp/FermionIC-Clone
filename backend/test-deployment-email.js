const { sendContactNotification } = require('./utils/emailService');
require('dotenv').config();

// Simulate deployment environment
process.env.NODE_ENV = 'production';
process.env.RENDER = 'true';

// Test email functionality in deployment simulation
const testDeploymentEmail = async () => {
  console.log('🚀 Testing email functionality in DEPLOYMENT SIMULATION...\n');
  
  const testContactData = {
    firstName: 'Deployment',
    lastName: 'Test',
    email: 'deployment-test@example.com',
    phone: '+1234567890',
    address: '123 Deployment Street, Cloud City, CC 12345',
    message: 'This is a deployment test message to verify that the email service works correctly in production environment with SMTP potentially blocked!'
  };
  
  try {
    console.log('📧 Sending deployment test notification...');
    console.log('🔧 Environment simulation:', {
      NODE_ENV: process.env.NODE_ENV,
      RENDER: process.env.RENDER,
      FORCE_HTTP_NOTIFICATIONS: process.env.FORCE_HTTP_NOTIFICATIONS
    });
    
    const result = await sendContactNotification(testContactData);
    
    console.log('\n📊 DEPLOYMENT TEST RESULTS:');
    console.log('============================');
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
      console.log('Data Keys:', Object.keys(result.data));
    }
    
    console.log('\n✅ Deployment test completed!');
    
    if (result.success) {
      console.log('🎉 Email service will work in deployment! Method:', result.method);
      if (result.method === 'formspree_webhook') {
        console.log('📧 Formspree will send email to: nikhilrajiitkgp@gmail.com');
      } else if (result.method === 'enhanced_console_log') {
        console.log('📋 Check deployment logs for contact form submissions');
      }
    } else {
      console.log('⚠️ Email service had issues, but contact data was preserved.');
    }
    
  } catch (error) {
    console.error('❌ Deployment test failed with error:', error);
  }
};

// Run the deployment test
testDeploymentEmail();
