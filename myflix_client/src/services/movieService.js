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
}

export const movieService = new MovieService();
