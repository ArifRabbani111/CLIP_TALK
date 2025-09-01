import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FilmIcon, 
  UserIcon, 
  LogoutIcon, 
  HomeIcon, 
  SearchIcon, 
  FireIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-letterboxd border-b border-letterboxd-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <FilmIcon className="h-8 w-8 text-letterboxd-accent group-hover:scale-110 transition-transform duration-200" />
              <span className="text-2xl font-bold text-letterboxd-text-bright group-hover:text-letterboxd-accent transition-colors duration-200">
                Clip-Talk
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            {user && (
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="flex items-center space-x-1 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200">
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link to="/search" className="flex items-center space-x-1 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200">
                  <SearchIcon className="h-5 w-5" />
                  <span>Search</span>
                </Link>
                <Link to="/feed" className="flex items-center space-x-1 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200">
                  <FireIcon className="h-5 w-5" />
                  <span>Feed</span>
                </Link>
              </nav>
            )}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200">
                  <img 
                    src={user.profilePicture} 
                    alt={user.username} 
                    className="h-8 w-8 rounded-full object-cover border-2 border-transparent hover:border-letterboxd-accent transition-colors duration-200"
                  />
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
                >
                  <LogoutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-letterboxd-text hover:text-letterboxd-accent focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-letterboxd-border animate-slide-up">
            {user ? (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/search" 
                  className="flex items-center space-x-2 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <SearchIcon className="h-5 w-5" />
                  <span>Search</span>
                </Link>
                <Link 
                  to="/feed" 
                  className="flex items-center space-x-2 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FireIcon className="h-5 w-5" />
                  <span>Feed</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
                >
                  <LogoutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/login" 
                  className="text-letterboxd-text hover:text-letterboxd-accent transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;