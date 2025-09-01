import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieSearch from './components/Movies/MovieSearch';
import MovieDetail from './components/Movies/MovieDetail';
import Feed from './components/Feed';
import Profile from './components/Users/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import GoogleAuthSuccess from './components/Auth/GoogleAuthSuccess';
import './App.css'; // This line should be present

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-letterboxd min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<ProtectedRoute><MovieSearch /></ProtectedRoute>} />
            <Route path="/movie/:id" element={<ProtectedRoute><MovieDetail /></ProtectedRoute>} />
            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/user/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/auth/success" element={<GoogleAuthSuccess />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;