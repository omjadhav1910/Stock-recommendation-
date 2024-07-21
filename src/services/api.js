import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/stocks');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks', error);
      }
    };

    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Stock Market Analysis</h1>
      <input
        type="text"
        placeholder="Search by symbol"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <div className="stock-list">
        {filteredStocks.map(stock => (
          <Link key={stock.symbol} to={`/stocks/${stock.symbol}`}>
            <div className="stock-item">
              {stock.name} ({stock.symbol})
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;
