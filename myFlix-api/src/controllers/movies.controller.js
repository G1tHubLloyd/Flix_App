// Minimal controller returning example data. Replace with real DB queries.

exports.getAll = async (req, res, next) => {
    try {
        const movies = [
            { id: '1', title: 'The Matrix', director: 'Wachowski' },
            { id: '2', title: 'Inception', director: 'Christopher Nolan' }
        ];
        res.json(movies);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = { id, title: 'Example Movie', director: 'Director Name' };
        res.json(movie);
    } catch (err) {
        next(err);
    }
};
