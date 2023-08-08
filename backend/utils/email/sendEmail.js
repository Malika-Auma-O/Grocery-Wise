const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USERNAME_USER,
    pass: process.env.USERNAME_PASS,
  },
});

// Read email template
const source = fs.readFileSync(path.join(__dirname,'template', 'requestResetPassword.handlebars'), 'utf8');
const template = handlebars.compile(source);

// Function to send password reset email
const sendPasswordResetEmail = async (toEmail, resetLink) => {
  try {
    const html = template({ resetLink: resetLink });

    const mailOptions = {
      from: process.env.SITE_NAME,
      to: toEmail,
      subject: 'Password Reset',
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = sendPasswordResetEmail;
