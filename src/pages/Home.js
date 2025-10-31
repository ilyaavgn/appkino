import React, { useEffect, useState } from 'react';
import { searchMovies, getMovieByKpId, getMovieByImdbId } from '../api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await searchMovies(1, 20);
        setMovies(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSearch = async (type, query) => {
    setLoading(true);
    setError(null);
    try {
      let movie;
      if (type === 'kp') {
        movie = await getMovieByKpId(query);
      } else {
        movie = await getMovieByImdbId(query);
      }
      setMovies([movie]);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Online Cinema</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
