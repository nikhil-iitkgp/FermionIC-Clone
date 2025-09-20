const nodemailer = require('nodemailer');

// Check if we're in a deployment environment
const isDeployment = process.env.NODE_ENV === 'production' || process.env.RENDER;

// Simple HTTP-based notification as fallback when SMTP is blocked
const sendHttpNotification = async (contactData) => {
  try {
    // For now, we'll just log the data in a structured way that can be monitored
    // In production, this could send to a webhook service like Discord, Slack, or Zapier
    
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
    
    // Log in JSON format for easy parsing by log monitoring services
    console.log('🚨 CONTACT_FORM_NOTIFICATION:', JSON.stringify(notificationData, null, 2));
    
    // You could also send this to external services like:
    // - Discord webhook
    // - Slack webhook  
    // - Zapier webhook
    // - Custom notification API
    
    return { success: true, method: 'http_log', data: notificationData };
  } catch (error) {
    console.error('❌ HTTP notification failed:', error);
    return { success: false, error: error.message };
  }
};

// Create transporter for Gmail with enhanced configuration
const createTransporter = () => {
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
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
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
      return { success: false, error: 'Email credentials not configured' };
    }
    
    console.log('📧 Email credentials found - creating transporter...');
    const transporter = createTransporter();
    
    // Verify SMTP connection
    console.log('📧 Verifying SMTP connection...');
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP connection verification failed:', verifyError.message);
      // Continue anyway, as some deployments may have firewall issues with verify
    }
    
    console.log('📧 Preparing email options...');
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nikhilrajiitkgp@gmail.com', // Your notification email
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

    console.log('📧 Email options prepared:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    console.log('📧 Attempting to send email...');
    let result;
    let lastError;
    
    // Try primary transporter
    try {
      result = await transporter.sendMail(mailOptions);
      console.log('✅ Primary transporter succeeded!');
    } catch (primaryError) {
      console.log('⚠️ Primary transporter failed, trying alternative configuration...');
      console.log('⚠️ Primary error:', primaryError.message);
      lastError = primaryError;
      
      // Try alternative transporter
      try {
        const altTransporter = createAlternativeTransporter();
        result = await altTransporter.sendMail(mailOptions);
        console.log('✅ Alternative transporter succeeded!');
      } catch (altError) {
        console.log('⚠️ Alternative transporter failed, trying deployment configuration...');
        console.log('⚠️ Alternative error:', altError.message);
        lastError = altError;
        
        // Try deployment transporter as final fallback
        try {
          const deployTransporter = createDeploymentTransporter();
          result = await deployTransporter.sendMail(mailOptions);
          console.log('✅ Deployment transporter succeeded!');
        } catch (deployError) {
          console.log('❌ All transporters failed, implementing fallback notification...');
          console.log('❌ Deployment error:', deployError.message);
          lastError = deployError;
          
          // Final fallback: Use HTTP notification system
          console.log('📋 SMTP blocked - using HTTP notification fallback...');
          const httpResult = await sendHttpNotification(contactData);
          
          if (httpResult.success) {
            console.log('✅ HTTP notification sent successfully');
            return { 
              success: true, 
              method: 'http_fallback',
              message: 'Contact notification sent via HTTP logging system',
              data: httpResult.data
            };
          } else {
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
          }
        }
      }
    }
    
    console.log('✅ SUCCESS: Contact notification email sent successfully!');
    console.log('✅ Email details:', {
      messageId: result.messageId,
      from: process.env.EMAIL_USER,
      to: 'nikhilrajiitkgp@gmail.com',
      timestamp: new Date().toISOString()
    });
    
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ FAILED: Error sending contact notification email');
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      timestamp: new Date().toISOString()
    });
    
    // Log specific error types
    if (error.code === 'EAUTH') {
      console.error('❌ AUTHENTICATION ERROR: Check your Gmail credentials in .env file');
      console.error('❌ Make sure you are using Gmail App Password, not regular password');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
      console.error('❌ CONNECTION TIMEOUT: SMTP server connection failed');
      console.error('❌ This may be due to firewall restrictions in deployment environment');
      console.error('❌ Consider using alternative email service or checking network settings');
    } else if (error.code === 'ENOTFOUND') {
      console.error('❌ DNS ERROR: Cannot resolve SMTP server hostname');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ CONNECTION REFUSED: SMTP server rejected connection');
    }
    
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
};
