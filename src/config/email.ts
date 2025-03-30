import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const sendVerificationEmail = async (to: string, code: string) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Verify Your OEARNFY Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6; text-align: center;">OEARNFY</h1>
          <h2 style="text-align: center;">Email Verification</h2>
          <p>Thank you for signing up with OEARNFY. Please use the following verification code to complete your registration:</p>
          <div style="text-align: center; padding: 20px;">
            <h1 style="letter-spacing: 5px; font-size: 32px; color: #3B82F6;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this verification, please ignore this email.</p>
          <hr style="margin: 20px 0;" />
          <p style="color: #666; font-size: 12px; text-align: center;">
            This is an automated message from OEARNFY.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 