const nodemailer = require('nodemailer');

// Create transporter for Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail app password
    },
  });
};

// Send notification email when contact form is submitted
const sendContactNotification = async (contactData) => {
  console.log('📧 Starting email notification process...');
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
    const result = await transporter.sendMail(mailOptions);
    
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
    
    // Log specific Gmail authentication errors
    if (error.code === 'EAUTH') {
      console.error('❌ AUTHENTICATION ERROR: Check your Gmail credentials in .env file');
      console.error('❌ Make sure you are using Gmail App Password, not regular password');
    }
    
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
};
