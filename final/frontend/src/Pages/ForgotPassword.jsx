import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Alert } from '@mui/material'; // Import Alert from MUI
import AuthService from '../Services/AuthService'; // Import the AuthService

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the AuthService to reset password
      await AuthService.resetPassword(email, otp, newPassword);
      // Reset form fields and show success message
      setEmail('');
      setOtp('');
      setNewPassword('');
      setError('');
      setSuccessMessage('Password reset successfully!'); // Set success message
    } catch (error) {
      console.error('Password reset failed:', error);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <div className="form-head">
          <center className="login-head">Forgot Password</center>
          <br />
          {/* Display success message using Alert */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {/* Display error message using Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="OTP"
              type="text"
              fullWidth
              sx={{ mb: 2 }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button variant="contained" type="submit" fullWidth size="large">
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
