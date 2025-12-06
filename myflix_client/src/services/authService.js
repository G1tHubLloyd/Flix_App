import { apiService } from './apiService';

class AuthService {
    async login(credentials) {
        try {
            const data = await apiService.post('/auth/login', credentials, { skipAuth: true });

            // Use a lightweight user object when the API does not return one
            const user = data.user || { username: credentials.username };

            if (data.token) {
                localStorage.setItem('token', data.token);
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
            }

            return { ...data, user };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async signup(userData) {
        try {
            const data = await apiService.post('/users', userData, { skipAuth: true });
            return data;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        const user = localStorage.getItem('user');
        if (!user) return null;

        try {
            return JSON.parse(user);
        } catch (err) {
            console.warn('Invalid user data in storage, clearing it');
            localStorage.removeItem('user');
            return null;
        }
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export const authService = new AuthService();
