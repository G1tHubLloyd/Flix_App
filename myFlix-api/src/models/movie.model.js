const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String },
    description: { type: String },
    genre: { type: String },
    year: { type: Number }
});

module.exports = mongoose.model('Movie', MovieSchema);
