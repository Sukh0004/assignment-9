const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(cookieParser());

// Set up CORS using env
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const flightsRouter = require('./routes/flights');

app.use('/api/auth', authRoutes);
app.use('/flights', flightsRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`REST API running on port ${PORT}`);
});


