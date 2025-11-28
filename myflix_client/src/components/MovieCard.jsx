import React from 'react'
import PropTypes from 'prop-types'

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      {movie.ImagePath && (
        <img src={movie.ImagePath} alt={movie.Title} />
      )}
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
  }).isRequired,
}
