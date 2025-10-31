import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const idParam = movie.kp_id
    ? `kp/${movie.kp_id}`
    : movie.imdb_id
    ? `imdb/${movie.imdb_id}`
    : '';
  const title = movie.name_rus || movie.name_eng || movie.name;
  return (
    <div style={{ border: '1px solid #ddd', padding: '0.5rem', margin: '0.5rem' }}>
      <Link to={`/movie/${idParam}`}>
        {movie.poster_url && (
          <img
            src={movie.poster_url}
            alt={title}
            style={{ width: '150px', height: '225px', objectFit: 'cover' }}
          />
        )}
        <h3>{title}</h3>
        <p>{movie.year || ''}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
