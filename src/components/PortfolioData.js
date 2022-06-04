import React from 'react'
import StockRow from './Stockrow'
function PortfolioData({stocks,selectedStock}) {

  const setSelectedStock=(stock)=>{
    selectedStock(stock);
  }
  return (
    <table className="portfolio"> 
    
    <thead className="stock-head">
      <th  scope="col" className="stock-isin">isin</th>
      <th  scope="col" >price</th>
      <th  scope="col" >bid</th>
      <th  scope="col" >ask</th>
      <th className="stock-time"  scope="col">Updated</th>
      <th  scope="col">  </th>
    </thead>
    <tbody>
    {Object.values(stocks).map((stock) => {
          return <StockRow key={stock.isin} stock={stock} selectedStock={selectedStock}/> ;
    })}
    </tbody>
  </table>
  )
}

export default PortfolioData