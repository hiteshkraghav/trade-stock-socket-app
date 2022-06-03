import React from "react";
import TimeAgo from 'react-timeago'
const StockRow = ({ stock ,selectedStock}) => {
  const selectedStockDetail = (stock) => {
    selectedStock(stock);
  };

  return (
      <>
    <tr style={{border: "1px solid"}} >
      <td>{stock.isin}</td>
          <td>{stock.price.toFixed(2)}</td>
          <td>{stock.bid.toFixed(2)}</td>
          <td>{stock.ask.toFixed(2)}</td>
          <td>
          <TimeAgo date={ stock.time } />
          </td>
          <td> <button onClick={()=>selectedStockDetail(stock)}>Remove</button>
 </td>
        </tr>
        </>
  );
};

export default StockRow;
