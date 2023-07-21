const express = require('express');
const cors = require("cors")
require('dotenv').config()
const connectDB = require('./config/db');
const companyRoutes = require('./routes/company.route');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/companies', companyRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
