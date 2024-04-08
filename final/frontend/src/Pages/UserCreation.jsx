import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, MenuItem, Alert } from '@mui/material'; // Import Alert from MUI
import UserService from '../Services/UserService';

const CreateUser = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [designation, setDesignation] = useState('');
    const [error, setError] = useState(null); // State for error message
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await UserService.createUser(email, username, address, phone, role, designation);
            console.log('User created successfully:', result);
            // Handle success (e.g., show a success message)
            setSuccessMessage('User created successfully!');
            setError(null); // Clear error message if present
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error (e.g., display an error message)
            setError('Failed to create user. Please try again.');
            setSuccessMessage(''); // Clear success message if present
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <div className="form-head">
                    <center className="login-head">Create New User</center>
                    <br />
                    {/* Display the error message if there is an error */}
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {/* Display the success message if user creation is successful */}
                    {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Username"
                            type="text"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Address"
                            type="text"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            label="Phone"
                            type="text"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            select
                            label="Role"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="">Select role</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Approver">Approver</MenuItem>
                        </TextField>
                        <TextField
                            label="Designation"
                            type="text"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                        <Button variant="contained" type="submit" fullWidth>Create User</Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default CreateUser;
