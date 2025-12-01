const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: String,
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: Date
    },
    ImagePath: String,
    Featured: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);
