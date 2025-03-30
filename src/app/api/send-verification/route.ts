import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function POST(request: Request) {
  try {
    const { email, code, name } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `"OEARNFY" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify your OEARNFY account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://oearnfy25-web.web.app/logo.svg" alt="OEARNFY Logo" style="width: 120px; height: 120px;">
          </div>
          <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Verify Your Email</h1>
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            Hi ${name},<br>
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

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 