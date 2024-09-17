const express = require('express');
const connectDB = require('./config/db.js');
const itemRoutes = require('./routes/itemRoutes.js');
const users=require('./routes/usersRouter.js')

require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users',users)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
