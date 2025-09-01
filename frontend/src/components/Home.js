import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FilmIcon, StarIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/outline';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-letterboxd to-letterboxd-light opacity-90"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-letterboxd-text-bright mb-6">
              Track, Rate, and Share
              <span className="block text-letterboxd-accent mt-2">Your Film Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-letterboxd-text mb-10 max-w-2xl mx-auto">
              Join the community of film lovers. Keep track of movies you've watched, save those you want to see, and share your thoughts with friends.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/login" className="btn btn-secondary flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link to="/register" className="btn btn-primary flex items-center justify-center space-x-2">
                  <span>Join Free</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-letterboxd-text-bright mb-4">Why Choose Letterboxd?</h2>
          <p className="text-letterboxd-text max-w-2xl mx-auto">
            Everything you need to track and share your film journey in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center transform transition-transform duration-300 hover:-translate-y-1">
            <div className="bg-letterboxd w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FilmIcon className="h-8 w-8 text-letterboxd-accent" />
            </div>
            <h3 className="text-xl font-bold text-letterboxd-text-bright mb-3">Track What You Watch</h3>
            <p className="text-letterboxd-text">
              Log films you've watched. Save those you want to see. Build your personal film diary.
            </p>
          </div>
          
          <div className="card p-8 text-center transform transition-transform duration-300 hover:-translate-y-1">
            <div className="bg-letterboxd w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <StarIcon className="h-8 w-8 text-letterboxd-accent" />
            </div>
            <h3 className="text-xl font-bold text-letterboxd-text-bright mb-3">Rate and Review</h3>
            <p className="text-letterboxd-text">
              Rate films, write reviews, and share your thoughts with the community.
            </p>
          </div>
          
          <div className="card p-8 text-center transform transition-transform duration-300 hover:-translate-y-1">
            <div className="bg-letterboxd w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserGroupIcon className="h-8 w-8 text-letterboxd-accent" />
            </div>
            <h3 className="text-xl font-bold text-letterboxd-text-bright mb-3">Connect with Others</h3>
            <p className="text-letterboxd-text">
              Follow friends and other members to see what they're watching and recommending.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {user && (
        <div className="bg-letterboxd-light py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-letterboxd-text-bright mb-6">Welcome back, {user.username}!</h2>
            <p className="text-letterboxd-text mb-8 max-w-2xl mx-auto">
              Ready to explore more films? Check out what's trending or search for your next favorite movie.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/search" className="btn btn-primary flex items-center justify-center space-x-2">
                <span>Search Movies</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link to="/feed" className="btn btn-secondary flex items-center justify-center space-x-2">
                <span>View Activity Feed</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-letterboxd-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FilmIcon className="h-6 w-6 text-letterboxd-accent" />
              <span className="text-lg font-bold text-letterboxd-text-bright">Clip Talk</span>
            </div>
            <div className="text-letterboxd-text text-sm">
              © {new Date().getFullYear()} ClipTalk. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;