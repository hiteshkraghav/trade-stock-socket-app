import React from 'react'
import StockRow from './Stockrow'
function PortfolioData({stocks,selectedStock}) {

  const setSelectedStock=(stock)=>{
    selectedStock(stock);
  }
  return (
    <div className="portfolio"> 
    <table  style={{position:'absolute',top:'30%',border: "1px solid red",justifyContent: 'center',alignItems: 'center'}}>
    <tr>
      <th>isin</th>
      <th>price</th>
      <th>bid</th>
      <th>ask</th>
      <th>Updated</th>
    </tr>
    {Object.values(stocks).map((stock) => {
          return <StockRow key={stock.isin} stock={stock} selectedStock={selectedStock}/>; 
    })}
  </table></div>
  )
}

export default PortfolioData