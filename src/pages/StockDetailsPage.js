import React from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import stockData from '../db.json'; 


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const StockDetailsPage = () => {
  const { symbol } = useParams();
  const stock = stockData.stocks.find(s => s.symbol.toLowerCase() === symbol.toLowerCase());

  if (!stock) {
    console.error(`Stock with symbol "${symbol}" not found.`);
    return <div className="stock-details-container">Stock not found</div>;
  }


  const historicalData = {
    labels: ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05'],  
    datasets: [
      {
        label: 'Stock Price',
        data: [stock.price - 10, stock.price, stock.price + 20, stock.price - 5, stock.price + 10],  
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      }
    ]
  };


  const canBuyStock = () => {
    const peRatioLimit = 25;
    const dividendYieldLimit = 1.5;
    const volumeLimit = 1000000;

    return (
      stock.peRatio < peRatioLimit &&
      parseFloat(stock.dividendYield) > dividendYieldLimit &&
      stock.volume > volumeLimit
    );
  };


  const recommendationMessage = canBuyStock() 
    ? "You can buy this stock based on the current analysis." 
    : "You should not buy this stock based on the current analysis.";

  return (
    <div className="stock-details-container">
      <h1>{stock.name} ({stock.symbol})</h1>
      <div className="stock-info">
        <p className="price">Price: <span>{stock.price}</span></p>
        <p className="change">Change: <span>{stock.change}</span></p>
        <p className="volume">Volume: <span>{stock.volume}</span></p>
        <p className="market-cap">Market Cap: <span>{stock.marketCap}</span></p>
        <p className="pe-ratio">P/E Ratio: <span>{stock.peRatio}</span></p>
        <p className="dividend-yield">Dividend Yield: <span>{stock.dividendYield}</span></p>
      </div>
      <div className={`recommendation ${canBuyStock() ? 'recommend' : 'not-recommend'}`}>
        {recommendationMessage}
      </div>
      <div className="chart-container">
        <Line data={historicalData} />
      </div>
    </div>
  );
};

export default StockDetailsPage;
