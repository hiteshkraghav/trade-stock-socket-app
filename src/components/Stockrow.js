import React from "react";
import TimeAgo from 'react-timeago'
const StockRow = ({ stock ,selectedStock}) => {
  const selectedStockDetail = (stock) => {
    selectedStock(stock);
  };

  return (
      <>
    <tr className="stock-info-container">
      <td   data-label="Isin" scope="row" className="stock-info stock-isin">{stock.isin}</td >
          <td  data-label="price" scope="row" className="stock-info">{stock.price.toFixed(2)}</td >
          <td  data-label="bid" scope="row" className="stock-info">{stock.bid.toFixed(2)}</td >
          <td data-label="ask"  scope="row" className="stock-info">{stock.ask.toFixed(2)}</td >
          <td data-label="updated"  scope="row" className="stock-info stock-time">
            
            <TimeAgo date={ stock.time } />
           
           
          </td >
          <td   scope="row" className="stock-info">
            <button type="button" onClick={()=>selectedStockDetail(stock)} className="btn-danger">Remove</button>
          </td >
        </tr>
        </>
  );
};

export default StockRow;
