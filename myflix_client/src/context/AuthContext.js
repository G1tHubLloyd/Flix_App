import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = authService.getToken();
        const savedUser = authService.getUser();

        if (token && savedUser) {
            setUser(savedUser);
        }

        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            const safeUser = data.user || { username: credentials.username };
            setUser(safeUser);
            return { ...data, user: safeUser };
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const data = await authService.signup(userData);
            return data;
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
