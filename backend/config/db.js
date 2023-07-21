const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_URI = process.env.mongoURL; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
