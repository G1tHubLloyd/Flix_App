import React, { useEffect, useState } from 'react';
import { movieService } from '../services/movieService';
import { useAuth } from '../context/AuthContext';
import './MoviesView.css';

const MoviesView = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const { logout, user } = useAuth();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const data = await movieService.getMovies();
            setMovies(data);
            setError(null);
        } catch (err) {
            setError('Failed to load movies. Please try again.');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFavorite = async (movieId) => {
        try {
            if (!user || !user.username) {
                setError('User not authenticated');
                return;
            }

            await movieService.addFavorite(user.username, movieId);
            setFavorites([...favorites, movieId]);
        } catch (err) {
            console.error('Error adding favorite:', err);
            setError('Failed to add favorite. Please try again.');
        }
    };

    const handleRemoveFavorite = async (movieId) => {
        try {
            if (!user || !user.username) {
                setError('User not authenticated');
                return;
            }

            await movieService.removeFavorite(user.username, movieId);
            setFavorites(favorites.filter(id => id !== movieId));
        } catch (err) {
            console.error('Error removing favorite:', err);
            setError('Failed to remove favorite. Please try again.');
        }
    };

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return (
            <div className="movies-view">
                <div className="loading">Loading movies...</div>
            </div>
        );
    }

    return (
        <div className="movies-view">
            <header className="movies-header">
                <h1>MyFlix - Movie Catalog</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            {error && <div className="error-message">{error}</div>}

            <div className="movies-grid">
                {movies.length === 0 ? (
                    <p className="no-movies">No movies available</p>
                ) : (
                    movies.map((movie) => (
                        <div key={movie._id} className="movie-card">
                            <img
                                src={movie.ImagePath || 'https://via.placeholder.com/300x450'}
                                alt={movie.Title}
                                className="movie-image"
                            />
                            <div className="movie-info">
                                <h3>{movie.Title}</h3>
                                <p className="movie-description">{movie.Description}</p>
                                {movie.Director && (
                                    <p className="movie-director">
                                        Director: {movie.Director.Name}
                                    </p>
                                )}
                                {movie.Genre && (
                                    <p className="movie-genre">Genre: {movie.Genre.Name}</p>
                                )}
                                <button
                                    className={`favorite-btn ${favorites.includes(movie._id) ? 'active' : ''}`}
                                    onClick={() => {
                                        if (favorites.includes(movie._id)) {
                                            handleRemoveFavorite(movie._id);
                                        } else {
                                            handleAddFavorite(movie._id);
                                        }
                                    }}
                                >
                                    {favorites.includes(movie._id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MoviesView;
