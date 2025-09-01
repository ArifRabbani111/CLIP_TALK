import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="card group overflow-hidden transform transition-all duration-300 hover:scale-105">
      <Link to={`/movie/${movie.tmdbId}`} className="block relative">
        <div className="aspect-w-2 aspect-h-3 overflow-hidden">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="text-letterboxd-text-bright font-bold text-lg truncate mb-1">{movie.title}</h3>
          <p className="text-letterboxd-text text-sm">{movie.releaseYear}</p>
        </div>
        <div className="absolute top-2 right-2 bg-letterboxd-accent text-letterboxd text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;