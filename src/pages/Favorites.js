import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import MovieCard from '../components/MovieCard';
import { getMovieByKpId, getMovieByImdbId } from '../api';

const Favorites = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user) return;
    const favRef = ref(db, `users/${user.uid}/favorites`);
    const unsubscribe = onValue(favRef, async (snapshot) => {
      const favIds = snapshot.val() || {};
      const results = [];
      for (const idKey of Object.keys(favIds)) {
        try {
          // Try KP first; if fails, fallback to imdb
          let movie;
          try {
            movie = await getMovieByKpId(idKey);
          } catch {
            movie = await getMovieByImdbId(idKey);
          }
          results.push(movie);
        } catch (err) {
          console.error(err);
        }
      }
      setMovies(results);
    });
    return () => unsubscribe();
  }, [user]);

  if (!user) return <p style={{ padding: '1rem' }}>Please login to view favorites.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Favorites</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
