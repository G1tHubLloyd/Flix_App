import Movie from '../models/Movie.js'

export async function listMovies(req, res, next) {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch (err) {
        next(err)
    }
}

export async function getMovie(req, res, next) {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) return res.status(404).json({ message: 'Not found' })
        res.json(movie)
    } catch (err) {
        next(err)
    }
}
