import { apiService } from './apiService';

class MovieService {
    async getMovies() {
        try {
            const movies = await apiService.get('/movies');
            return movies;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }

    async getMovie(id) {
        try {
            const movie = await apiService.get(`/movies/${id}`);
            return movie;
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw error;
        }
    }

    async addFavorite(username, movieId) {
        try {
            const response = await apiService.post(
                `/users/${username}/movies/${movieId}`,
                {},
                { method: 'POST' }
            );
            return response;
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw error;
        }
    }

    async removeFavorite(username, movieId) {
        try {
            const response = await apiService.delete(
                `/users/${username}/movies/${movieId}`
            );
            return response;
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw error;
        }
    }
}

export const movieService = new MovieService();
