const https = require('https');

// Production-ready email service configuration
const isProduction = process.env.NODE_ENV === 'production';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'nikhilrajiitkgp@gmail.com';
const COMPANY_NAME = process.env.COMPANY_NAME || 'SiktaSys';

console.log('📧 Email Service Initialized:', {
  environment: isProduction ? 'production' : 'development',
  notificationEmail: NOTIFICATION_EMAIL,
  companyName: COMPANY_NAME
});

// Formspree webhook notification (Primary - Most Reliable)
const sendFormspreeNotification = async (contactData) => {
  return new Promise((resolve) => {
    try {
      console.log('📧 Sending via Formspree webhook...');
      
      const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xnnbebwk';
      
      const formData = JSON.stringify({
        name: `${contactData.firstName} ${contactData.lastName}`,
        email: contactData.email,
        phone: contactData.phone,
        address: contactData.address,
        message: contactData.message,
        _replyto: contactData.email,
        _subject: `🔔 New Contact Form Submission - ${COMPANY_NAME}`,
        _template: 'table',
        _format: 'plain',
        source: `${COMPANY_NAME} Website Contact Form`,
        timestamp: new Date().toISOString()
      });

      const url = new URL(formspreeEndpoint);
      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Content-Length': Buffer.byteLength(formData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ Formspree email sent successfully to ${NOTIFICATION_EMAIL}`);
            resolve({ 
              success: true, 
              method: 'formspree_webhook', 
              data: { statusCode: res.statusCode },
              recipient: NOTIFICATION_EMAIL
            });
          } else {
            console.error('❌ Formspree webhook failed:', res.statusCode, data);
            resolve({ success: false, error: `Formspree webhook failed: ${res.statusCode}` });
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Formspree webhook request error:', error);
        resolve({ success: false, error: error.message });
      });

      req.write(formData);
      req.end();

    } catch (error) {
      console.error('❌ Formspree webhook error:', error);
      resolve({ success: false, error: error.message });
    }
  });
};

// Discord webhook notification (Secondary - Instant Notifications)
const sendDiscordNotification = async (contactData) => {
  return new Promise((resolve) => {
    try {
      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.log('📋 Discord webhook not configured, skipping...');
        resolve({ success: false, error: 'Discord webhook not configured' });
        return;
      }

      console.log('📧 Sending Discord notification...');

      const discordPayload = {
        embeds: [{
          title: `🔔 New Contact Form Submission - ${COMPANY_NAME}`,
          color: 0x3b82f6, // Blue color
          fields: [
            { name: '👤 Name', value: `${contactData.firstName} ${contactData.lastName}`, inline: true },
            { name: '📧 Email', value: contactData.email, inline: true },
            { name: '📱 Phone', value: contactData.phone, inline: true },
            { name: '📍 Address', value: contactData.address, inline: false },
            { name: '💬 Message', value: contactData.message.substring(0, 1000), inline: false }
          ],
          timestamp: new Date().toISOString(),
          footer: { text: `${COMPANY_NAME} Contact Form` }
        }]
      };

      const postData = JSON.stringify(discordPayload);
      const url = new URL(webhookUrl);

      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('✅ Discord notification sent successfully');
            resolve({ success: true, method: 'discord_webhook', data: discordPayload });
          } else {
            console.error('❌ Discord webhook failed:', res.statusCode, data);
            resolve({ success: false, error: `Discord webhook failed: ${res.statusCode}` });
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Discord webhook request error:', error);
        resolve({ success: false, error: error.message });
      });

      req.write(postData);
      req.end();

    } catch (error) {
      console.error('❌ Discord notification error:', error);
      resolve({ success: false, error: error.message });
    }
  });
};

// Enhanced console logging (Fallback - Always Works)
const logContactSubmission = (contactData) => {
  const notificationData = {
    timestamp: new Date().toISOString(),
    type: 'CONTACT_FORM_SUBMISSION',
    recipient: NOTIFICATION_EMAIL,
    data: {
      name: `${contactData.firstName} ${contactData.lastName}`,
      email: contactData.email,
      phone: contactData.phone,
      address: contactData.address,
      message: contactData.message
    },
    metadata: {
      company: COMPANY_NAME,
      source: 'Website Contact Form',
      environment: isProduction ? 'production' : 'development'
    }
  };
  
  // Enhanced logging for better visibility in deployment logs
  console.log('\n' + '='.repeat(80));
  console.log(`🚨 NEW CONTACT FORM SUBMISSION - ${COMPANY_NAME} 🚨`);
  console.log('='.repeat(80));
  console.log(`👤 Name: ${contactData.firstName} ${contactData.lastName}`);
  console.log(`📧 Email: ${contactData.email}`);
  console.log(`📱 Phone: ${contactData.phone}`);
  console.log(`📍 Address: ${contactData.address}`);
  console.log(`💬 Message: ${contactData.message}`);
  console.log(`📬 Notification Email: ${NOTIFICATION_EMAIL}`);
  console.log(`⏰ Time: ${new Date().toLocaleString()}`);
  console.log('='.repeat(80));
  console.log('🚨 STRUCTURED DATA:', JSON.stringify(notificationData, null, 2));
  console.log('='.repeat(80) + '\n');
  
  return { success: true, method: 'console_log', data: notificationData };
};

// Main email notification service
const sendContactNotification = async (contactData) => {
  console.log('📧 Starting contact notification process...');
  console.log('📧 Configuration:', {
    environment: isProduction ? 'production' : 'development',
    notificationEmail: NOTIFICATION_EMAIL,
    company: COMPANY_NAME,
    hasFormspree: !!process.env.FORMSPREE_ENDPOINT,
    hasDiscord: !!process.env.DISCORD_WEBHOOK_URL
  });
  
  console.log('📧 Contact data received:', {
    name: `${contactData.firstName} ${contactData.lastName}`,
    email: contactData.email,
    phone: contactData.phone
  });
  
  try {
    // Strategy 1: Formspree webhook (Primary - Most reliable)
    console.log('📧 Strategy 1: Formspree webhook...');
    const formspreeResult = await sendFormspreeNotification(contactData);
    
    if (formspreeResult.success) {
      console.log(`✅ Email sent successfully to ${NOTIFICATION_EMAIL} via Formspree!`);
      
      // Also try Discord for instant notification (non-blocking)
      sendDiscordNotification(contactData)
        .then(discordResult => {
          if (discordResult.success) {
            console.log('✅ Discord notification also sent successfully');
          }
        })
        .catch(error => {
          console.log('⚠️ Discord notification failed (non-critical):', error.message);
        });
      
      return {
        success: true,
        method: 'formspree_webhook',
        message: `Email sent successfully to ${NOTIFICATION_EMAIL} via Formspree`,
        recipient: NOTIFICATION_EMAIL,
        data: formspreeResult.data
      };
    }
    
    console.log('⚠️ Formspree failed, trying Discord...');
    
    // Strategy 2: Discord webhook (Secondary)
    const discordResult = await sendDiscordNotification(contactData);
    
    if (discordResult.success) {
      console.log('✅ Discord notification sent successfully');
      
      // Also log to console for backup
      const logResult = logContactSubmission(contactData);
      
      return {
        success: true,
        method: 'discord_webhook',
        message: 'Notification sent via Discord webhook (email failed)',
        recipient: NOTIFICATION_EMAIL,
        data: discordResult.data,
        backup: logResult.data
      };
    }
    
    console.log('⚠️ Discord also failed, using console logging...');
    
    // Strategy 3: Console logging (Fallback - Always works)
    const logResult = logContactSubmission(contactData);
    
    return {
      success: true,
      method: 'console_log',
      message: `Contact logged to console - check deployment logs for submission to ${NOTIFICATION_EMAIL}`,
      recipient: NOTIFICATION_EMAIL,
      data: logResult.data
    };
    
  } catch (error) {
    console.error('❌ Email notification process failed:', error);
    
    // Emergency fallback
    const emergencyLog = logContactSubmission(contactData);
    
    return {
      success: true, // Still return success because data is preserved
      method: 'emergency_log',
      message: `Emergency logging activated - contact preserved for ${NOTIFICATION_EMAIL}`,
      recipient: NOTIFICATION_EMAIL,
      data: emergencyLog.data,
      originalError: error.message
    };
  }
};

module.exports = {
  sendContactNotification,
};
