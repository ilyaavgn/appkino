import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import { callVibix } from '../api';

const MovieDetail = () => {
  const { type, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await callVibix(`/v1/publisher/videos/${type}/${id}`);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [type, id]);

  const handleAddFavorite = async () => {
    if (!user || !movie) return;
    try {
      const favRef = ref(db, `users/${user.uid}/favorites/${movie.kp_id || movie.imdb_id}`);
      await set(favRef, true);
      alert('Added to favorites');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>No movie found</p>;

  const title = movie.name_rus || movie.name_eng || movie.name;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{title}</h2>
      {movie.poster_url && (
        <img src={movie.poster_url} alt={title} style={{ width: '200px' }} />
      )}
      <p>{movie.description || movie.description_short}</p>
      <p>Year: {movie.year || '-'}</p>
      {movie.genre && movie.genre.length > 0 && <p>Genres: {movie.genre.join(', ')}</p>}
      <button onClick={handleAddFavorite}>Add to Favorites</button>
      {movie.iframe_url && (
        <div style={{ marginTop: '1rem' }}>
          <iframe
            src={movie.iframe_url}
            title="video player"
            width="640"
            height="360"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
