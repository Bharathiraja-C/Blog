// utils/mailer.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.E_USER,
      pass: process.env.E_PASSWORD,
    },
  });
  
// Function to send an email with temporary username and password
async function sendEmail(email, tempPassword) {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to our platform',
      html: `
        <p>Dear User,</p>
        <p>Your temporary username is: ${email}</p>
        <p>Your temporary password is: ${tempPassword}</p>
        <p>Please click <a href="http://yourwebsite.com/update-password">here</a> to update your password.</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw error to handle it in UserController
  }
}

// Function to send forgot password email with OTP
async function sendForgotPasswordEmail(email, otp) {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP to reset password is: ${otp}`,
      html: `
        <p>Dear User,</p>
        <p>Your OTP to reset password is: <strong>${otp}</strong></p>
        <p>Click here to update the password  http://localhost:3000/forgot-password</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `
    });
    console.log('Forgot password email sent successfully');
  } catch (error) {
    console.error('Error sending forgot password email:', error);
    throw error; // Re-throw error to handle it in AuthController
  }
}
// Function to send an email with temporary username and password
async function sendApproveEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from:  process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text
  });
    console.log('Email sent successfully');
  console.log(to,text);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw error to handle it in UserController
  }
}
async function sendStatusEmail(to, subject, text) {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from:  process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text
  });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw error to handle it in UserController
  }
}
module.exports = { sendEmail, sendForgotPasswordEmail ,sendApproveEmail,sendStatusEmail};

