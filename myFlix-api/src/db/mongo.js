const mongoose = require('mongoose');
const config = require('../config/config');

async function connectDB() {
    await mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
}

module.exports = { connectDB };
