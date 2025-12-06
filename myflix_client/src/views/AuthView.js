import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../context/AuthContext';
import './AuthView.css';

const AuthView = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { login, signup } = useAuth();

    const handleLogin = async (credentials) => {
        try {
            await login(credentials);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    const handleSignup = async (userData) => {
        try {
            await signup(userData);
            alert('Account created successfully! Please login.');
            setShowLogin(true);
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="auth-view">
            {showLogin ? (
                <LoginForm
                    onSubmit={handleLogin}
                    onSwitchToSignup={() => setShowLogin(false)}
                />
            ) : (
                <SignupForm
                    onSubmit={handleSignup}
                    onSwitchToLogin={() => setShowLogin(true)}
                />
            )}
        </div>
    );
};

export default AuthView;
