// server.js or index.js (depending on your file name)
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 🧠 Connect to MongoDB
connectDB();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 📦 API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// 🔥 Global Error Handler (must come after all routes)
app.use((err, req, res, next) => {
    console.error('💥 Global error handler:', err.stack);
    res.status(500).json({
        message: 'Something broke!',
        error: err.message,
    });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
