import React from "react";
import TimeAgo from "react-timeago";

// Rows displaying the individual details about ISIN

const StockRow = ({ stock, selectedStock, count }) => {
  const selectedStockDetail = (stock, e) => {
    selectedStock(stock, e);
  };

  return (
    <>
      <tr className="stock-info-container">
        <td data-label="Isin" className="stock-info stock-isin">
          {count + 1}
        </td>
        <td data-label="Isin" className="stock-info stock-isin">
          {stock.isin}
        </td>
        <td data-label="price" className="stock-info">
          {stock.price.toFixed(2)}
        </td>
        <td data-label="bid" className="stock-info">
          {stock.bid.toFixed(2)}
        </td>
        <td data-label="ask" className="stock-info">
          {stock.ask.toFixed(2)}
        </td>
        <td data-label="updated" className="stock-info stock-time">
          <TimeAgo date={stock.time} />
        </td>
        <td className="stock-info">
          <button
            type="button"
            onClick={(e) => selectedStockDetail(stock, e)}
            className="btn-danger"
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

export default React.memo(StockRow);
