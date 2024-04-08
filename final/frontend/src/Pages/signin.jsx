import React, { useState } from "react";
import { Button, Alert, Grid, Link, Box, Typography, Container, CssBaseline, Avatar, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // State for showing/hiding the forgot password modal
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(""); 
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      // Call the backend API to initiate the "Forgot Password" process
      await AuthService.forgotPassword(forgotPasswordEmail);
      // Show success message to the user
      alert("Instructions to reset your password have been sent to your email address.");
      // Close the forgot password modal
      setShowForgotPasswordModal(false);
    } catch (error) {
      console.error("Forgot Password failed:", error);
      setError("Failed to initiate the forgot password process. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const result = await AuthService.login(email, password);
      console.log(result.user);
      const { username, role } = result.user;
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.user.role);
      localStorage.setItem("username", result.user.username);
      localStorage.setItem("userid", result.user.id);
      const nextPage = `/profile`;
      navigate(nextPage, { state: { username, token: result.token, role } });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}{" "}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={() => setShowForgotPasswordModal(true)}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Alert variant="danger" style={{ marginTop: '20px' }}>{error}</Alert>
        <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForgotPasswordModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleForgotPassword}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
