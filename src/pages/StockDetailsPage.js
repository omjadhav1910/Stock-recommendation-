import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../index.css';

const StockDetailsPage = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/stocks`);
        const stock = response.data.find(stock => stock.symbol.toLowerCase() === symbol.toLowerCase());
        setStockData(stock);

        // Calculate recommendation
        if (stock.peRatio < 20 && parseFloat(stock.dividendYield) > 1) {
          setRecommendation('You can buy this stock.');
        } else {
          setRecommendation('This stock is not recommended for buying based on current criteria.');
        }

        // Set up chart data
        setChartData({
          labels: ['Price', 'Change', 'Volume', 'Market Cap', 'P/E Ratio', 'Dividend Yield'],
          datasets: [{
            label: stock.name,
            data: [stock.price, parseFloat(stock.change), stock.volume, parseFloat(stock.marketCap), stock.peRatio, parseFloat(stock.dividendYield)],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Error fetching stock data', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (!stockData) return <div>Loading...</div>;

  return (
    <div className="stock-details-container">
      <h1>{stockData.name} ({stockData.symbol})</h1>
      <div className="stock-detail-box">
        <p className="price">Price: {stockData.price}</p>
        <p className="change">Change: {stockData.change}</p>
        <p className="volume">Volume: {stockData.volume}</p>
        <p className="market-cap">Market Cap: {stockData.marketCap}</p>
        <p className="pe-ratio">P/E Ratio: {stockData.peRatio}</p>
        <p className="dividend-yield">Dividend Yield: {stockData.dividendYield}</p>
      </div>
      <p className="recommendation">{recommendation}</p>
      {chartData && (
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default StockDetailsPage;
