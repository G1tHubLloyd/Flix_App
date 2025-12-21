import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imagePath: { type: String },
        genre: {
            name: { type: String, required: true },
            description: { type: String },
        },
        director: {
            name: { type: String, required: true },
            bio: { type: String },
            birth: { type: Date },
        },
        releaseDate: { type: String },
    },
    { timestamps: true }
)

const Movie = mongoose.model('Movie', movieSchema)
export default Movie
