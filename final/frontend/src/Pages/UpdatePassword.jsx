import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Alert } from "@mui/material"; // Import Alert from MUI
import { useNavigate } from "react-router-dom";
import UserService from "../Services/UserService"; // Import the UserService
import "./Login.css";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await UserService.updatePassword(
        email,
        tempPassword,
        password
      );
      console.log("User created successfully:", result);
      // Handle success (e.g., show a success message)
      setSuccessMessage("Password updated successfully!");
      setError(null); // Clear error message if present
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Please enter a valid password");
      // Handle error (e.g., display an error message)
      setSuccessMessage(""); // Clear success message if present
    }
  };

  return (
    <>
      <center className="login-head">Update Password</center>
      
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
        {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
          <div className="centered-container">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Temporary Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" type="submit" fullWidth size="large">
                Update
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateUser;
