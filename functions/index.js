/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass
  }
});

// Email verification endpoint
app.post('/send-verification', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required' });
    }

    // Email template
    const mailOptions = {
      from: 'OEARNFY <oearnfycompany@gmail.com>',
      to: email,
      subject: 'Verify your OEARNFY account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://oearnfy25-web.web.app/logo.svg" alt="OEARNFY Logo" style="width: 120px; height: 120px;">
          </div>
          <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Verify Your Email</h1>
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            Thank you for signing up with OEARNFY! To complete your registration, please use the following verification code:
          </p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 5px; margin-bottom: 30px;">
            <span style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 5px;">${code}</span>
          </div>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
          </p>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px;">
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app);
