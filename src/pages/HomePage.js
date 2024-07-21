import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/stock/${query}`);
  };

  return (
    <div className='stock-home'>
      <h1>Stock Analysis</h1>
      <form onSubmit={handleSearch} className='search-form'>
        <input className='search-input'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a stock symbol..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default HomePage;
