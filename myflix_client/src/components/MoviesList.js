import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './Moviecard';

function MoviesList({ movies }) {
  if (!movies) return null;

  return (
    <div className="movies-grid">
      {movies.map((m) => (
        <MovieCard key={m._id || m.id} movie={m} />
      ))}
    </div>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      Title: PropTypes.string,
      Description: PropTypes.string,
    })
  ),
};

MoviesList.defaultProps = {
  movies: [],
};

export default MoviesList;
