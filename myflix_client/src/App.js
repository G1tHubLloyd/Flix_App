import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthView from './views/AuthView';
import MoviesView from './views/MoviesView';
import './App.css';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="App">
        <div className="loading-screen">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? <MoviesView /> : <AuthView />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
