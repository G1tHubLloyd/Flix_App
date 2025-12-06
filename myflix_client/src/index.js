import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('Index.js loaded');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element:', rootElement);

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    console.log('Root created, rendering App...');

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  } else {
    console.error('Root element not found!');
  }
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = `<div style="padding: 50px; background: red; color: white;">
    <h1>Error</h1>
    <pre>${error.toString()}</pre>
  </div>`;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
