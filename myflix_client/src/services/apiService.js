const API_URL = process.env.REACT_APP_API_URL || 'https://lit-shelf-96037-05158a2eb522.herokuapp.com';

class ApiService {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        if (token && !options.skipAuth) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    get(endpoint, options) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    put(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    delete(endpoint, options) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

export const apiService = new ApiService();
