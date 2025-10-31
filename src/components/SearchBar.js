import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('kp');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    onSearch(type, query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="kp">Kinopoisk ID</option>
        <option value="imdb">IMDB ID</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter ID"
        style={{ marginLeft: '0.5rem' }}
      />
      <button type="submit" style={{ marginLeft: '0.5rem' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
