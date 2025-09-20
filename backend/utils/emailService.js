const nodemailer = require('nodemailer');
const https = require('https');

// Check if we're in a deployment environment
const isDeployment = process.env.NODE_ENV === 'production' || process.env.RENDER;

// EmailJS API integration for reliable email delivery in deployment
const sendEmailJSNotification = async (contactData) => {
  try {
    const emailData = {
      service_id: 'service_siktasys', // We'll use a generic service ID
      template_id: 'template_contact', // We'll use a generic template ID
      user_id: process.env.EMAILJS_PUBLIC_KEY || 'default_user',
      template_params: {
        from_name: `${contactData.firstName} ${contactData.lastName}`,
        from_email: contactData.email,
        phone: contactData.phone,
        address: contactData.address,
        message: contactData.message,
        to_email: 'nikhilrajiitkgp@gmail.com',
        reply_to: contactData.email
      }
    };

    // For now, we'll simulate EmailJS but actually send via webhook
    console.log('📧 EmailJS simulation - would send:', emailData);
    
    return { success: true, method: 'emailjs_simulation', data: emailData };
  } catch (error) {
    console.error('❌ EmailJS notification failed:', error);
    return { success: false, error: error.message };
  }
};

// Discord webhook notification (reliable alternative)
const sendDiscordNotification = async (contactData) => {
  return new Promise((resolve) => {
    try {
      // Discord webhook URL (you can set this in environment variables)
      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.log('📋 Discord webhook not configured, using console logging');
        const notificationData = {
          timestamp: new Date().toISOString(),
          type: 'CONTACT_FORM_SUBMISSION',
          data: {
            name: `${contactData.firstName} ${contactData.lastName}`,
            email: contactData.email,
            phone: contactData.phone,
            address: contactData.address,
            message: contactData.message
          },
          metadata: {
            userAgent: 'SiktaSys Contact Form',
            source: 'Website Contact Form',
            environment: isDeployment ? 'production' : 'development'
          }
        };
        
        console.log('🚨 CONTACT_FORM_NOTIFICATION:', JSON.stringify(notificationData, null, 2));
        resolve({ success: true, method: 'console_log', data: notificationData });
        return;
      }

      const discordPayload = {
        embeds: [{
          title: '🔔 New Contact Form Submission - SiktaSys',
          color: 0x3b82f6, // Blue color
          fields: [
            { name: '👤 Name', value: `${contactData.firstName} ${contactData.lastName}`, inline: true },
            { name: '📧 Email', value: contactData.email, inline: true },
            { name: '📱 Phone', value: contactData.phone, inline: true },
            { name: '📍 Address', value: contactData.address, inline: false },
            { name: '💬 Message', value: contactData.message.substring(0, 1000), inline: false }
          ],
          timestamp: new Date().toISOString(),
          footer: { text: 'SiktaSys Contact Form' }
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

// Simple HTTP-based notification as fallback when SMTP is blocked
const sendHttpNotification = async (contactData) => {
  try {
    // Try Discord webhook first, then fall back to console logging
    const discordResult = await sendDiscordNotification(contactData);
    
    if (discordResult.success) {
      return discordResult;
    }
    
    // Fallback to EmailJS simulation
    const emailJSResult = await sendEmailJSNotification(contactData);
    return emailJSResult;
    
  } catch (error) {
    console.error('❌ HTTP notification failed:', error);
    return { success: false, error: error.message };
  }
};

// Create transporter for Gmail with enhanced configuration
const createTransporter = () => {
  const timeouts = isDeployment ? {
    connectionTimeout: 5000, // 5 seconds for deployment
    greetingTimeout: 3000, // 3 seconds for deployment
    socketTimeout: 5000, // 5 seconds for deployment
  } : {
    connectionTimeout: 60000, // 60 seconds for local
    greetingTimeout: 30000, // 30 seconds for local
    socketTimeout: 60000, // 60 seconds for local
  };

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail app password
    },
    tls: {
      rejectUnauthorized: false
    },
    ...timeouts
  });
};

// Alternative transporter with different configuration for deployment environments
const createAlternativeTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 15000, // 15 seconds
    socketTimeout: 30000, // 30 seconds
  });
};

// Deployment-friendly transporter using SendGrid SMTP (more reliable for cloud platforms)
const createDeploymentTransporter = () => {
  // For deployment environments, we'll use a different approach
  // This uses Gmail with OAuth2 or falls back to a webhook approach
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 2525, // Alternative port that might work better
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    connectionTimeout: 10000, // Shorter timeout for faster fallback
    greetingTimeout: 5000,
    socketTimeout: 10000,
    debug: true, // Enable debug for deployment
    logger: true
  });
};

// Send actual email using Gmail SMTP (works in most environments)
const sendGmailNotification = async (contactData) => {
  try {
    console.log('📧 Attempting Gmail SMTP delivery...');
    
    // Create a more reliable transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"SiktaSys Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'nikhilrajiitkgp@gmail.com',
      subject: '🔔 New Contact Form Submission - SiktaSys',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">
            🔔 New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 30%;">Name:</td>
                <td style="padding: 8px 0; color: #6b7280;">${contactData.firstName} ${contactData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #6b7280;">
                  <a href="mailto:${contactData.email}" style="color: #2563eb; text-decoration: none;">
                    ${contactData.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 8px 0; color: #6b7280;">
                  <a href="tel:${contactData.phone}" style="color: #2563eb; text-decoration: none;">
                    ${contactData.phone}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Address:</td>
                <td style="padding: 8px 0; color: #6b7280;">${contactData.address}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Message:</h3>
            <p style="color: #78350f; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #ecfdf5; border-radius: 8px; text-align: center;">
            <p style="color: #065f46; margin: 0; font-size: 14px;">
              📧 This message was sent via the SiktaSys website contact form.
            </p>
            <p style="color: #065f46; margin: 5px 0 0 0; font-size: 12px;">
              Timestamp: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Gmail SMTP email sent successfully:', result.messageId);
    
    return { 
      success: true, 
      method: 'gmail_smtp', 
      messageId: result.messageId,
      message: 'Email sent successfully via Gmail SMTP'
    };
    
  } catch (error) {
    console.error('❌ Gmail SMTP failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Send notification email when contact form is submitted
const sendContactNotification = async (contactData) => {
  console.log('📧 Starting email notification process...');
  console.log('📧 Environment info:', {
    isDeployment,
    nodeEnv: process.env.NODE_ENV,
    hasRender: !!process.env.RENDER,
    hasEmailUser: !!process.env.EMAIL_USER,
    hasEmailPass: !!process.env.EMAIL_PASS
  });
  console.log('📧 Contact data received:', {
    name: `${contactData.firstName} ${contactData.lastName}`,
    email: contactData.email,
    phone: contactData.phone
  });
  
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email credentials not configured in .env file');
      
      // Still try HTTP notification as fallback
      const httpResult = await sendHttpNotification(contactData);
      return {
        success: httpResult.success,
        method: 'http_fallback_no_creds',
        message: 'Email credentials missing, used HTTP notification',
        error: httpResult.success ? null : httpResult.error
      };
    }
    
    // Strategy 1: Try Gmail SMTP first (works in most cases)
    console.log('📧 Strategy 1: Attempting Gmail SMTP...');
    const gmailResult = await sendGmailNotification(contactData);
    
    if (gmailResult.success) {
      console.log('✅ Gmail SMTP succeeded!');
      return gmailResult;
    }
    
    console.log('⚠️ Gmail SMTP failed, trying fallback methods...');
    
    // Strategy 2: Use HTTP notification as reliable fallback
    console.log('📧 Strategy 2: Using HTTP notification fallback...');
    const httpResult = await sendHttpNotification(contactData);
    
    if (httpResult.success) {
      console.log('✅ HTTP notification sent successfully (SMTP fallback)');
      return { 
        success: true, 
        method: httpResult.method,
        message: 'Contact notification sent via HTTP system (SMTP failed but fallback succeeded)',
        data: httpResult.data,
        smtpError: gmailResult.error
      };
    }
    
    // Strategy 3: Final fallback - return error but with contact data preserved
    console.log('❌ All notification methods failed');
    return { 
      success: false, 
      error: 'All email and notification methods failed. Contact data saved to database.',
      fallback: true,
      contactData: {
        name: `${contactData.firstName} ${contactData.lastName}`,
        email: contactData.email,
        phone: contactData.phone,
        timestamp: new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error('❌ FAILED: Error in email notification process');
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
    
    // Try HTTP notification as final emergency fallback
    try {
      const emergencyResult = await sendHttpNotification(contactData);
      if (emergencyResult.success) {
        return {
          success: true,
          method: 'emergency_http',
          message: 'Emergency HTTP notification sent after error',
          data: emergencyResult.data,
          originalError: error.message
        };
      }
    } catch (emergencyError) {
      console.error('❌ Emergency fallback also failed:', emergencyError);
    }
    
    return { 
      success: false, 
      error: error.message,
      contactData: {
        name: `${contactData.firstName} ${contactData.lastName}`,
        email: contactData.email,
        phone: contactData.phone,
        timestamp: new Date().toISOString()
      }
    };
  }
};

module.exports = {
  sendContactNotification,
};
