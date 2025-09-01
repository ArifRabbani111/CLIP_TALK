import React, { useState } from 'react';
import { searchMovies } from '../../services/api';
import MovieCard from './MovieCard';
import { SearchIcon } from '@heroicons/react/outline';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const { data } = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-letterboxd-text-bright mb-2">Search Movies</h1>
        <p className="text-letterboxd-text mb-8">Find and rate films you've watched</p>
        
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="input pl-12 pr-4 py-3 w-full text-lg"
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-letterboxd-text" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-letterboxd-accent text-letterboxd px-4 py-1.5 rounded-md font-medium hover:bg-letterboxd-accent-hover transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-letterboxd-accent"></div>
            <p className="mt-4 text-letterboxd-text">Searching movies...</p>
          </div>
        ) : (
          <>
            {movies.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-letterboxd-text-bright">
                    Search Results <span className="text-letterboxd-text">({movies.length})</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.tmdbId} movie={movie} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mb-6 flex justify-center">
                  <div className="bg-letterboxd-light w-16 h-16 rounded-full flex items-center justify-center">
                    <SearchIcon className="h-8 w-8 text-letterboxd-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-letterboxd-text-bright mb-2">
                  {query ? 'No movies found' : 'Start your search'}
                </h3>
                <p className="text-letterboxd-text max-w-md mx-auto">
                  {query 
                    ? 'Try searching with different keywords.' 
                    : 'Enter a movie title above to find films to watch and review.'
                  }
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;