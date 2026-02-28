require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/habits', require('./routes/habits'));
app.use('/api/workouts', require('./routes/workouts'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'PhysiqueAI API is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 PhysiqueAI Backend running on port ${PORT}`);
});
