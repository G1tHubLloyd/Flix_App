import axios from 'axios';

const API = axios.create({
   baseURL: process.env.REACT_APP_API_BASE || 'https://lloydapi-80af0491ac6e.herokuapp.com'
});

// Movies
export const getMovies = () => API.get('/movies');
export const getMovieById = (id) => API.get(`/movies/${id}`);

// Users
export const registerUser = (data) => API.post('/users', data);
export const loginUser = (data) => API.post('/login', data);
export const getUser = (username) => API.get(`/users/${username}`);
export const updateUser = (username, data) => API.put(`/users/${username}`, data);
export const deleteUser = (username) => API.delete(`/users/${username}`);

// Favorites
export const addFavorite = (username, movieId) => API.post(`/users/${username}/movies/${movieId}`);
export const removeFavorite = (username, movieId) => API.delete(`/users/${username}/movies/${movieId}`);
