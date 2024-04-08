// index.js

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', skillRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
