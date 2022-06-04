import React from "react";
import StockRow from "./Stockrow";
function PortfolioData({ stocks, selectedStock }) {
  return (
    <table data-label="table-display-stocks" className="portfolio">
      <thead className="stock-head">
        <th>No</th>
        <th className="stock-isin">isin</th>
        <th>price</th>
        <th>bid</th>
        <th>ask</th>
        <th className="stock-time">Updated</th>
        <th> </th>
      </thead>
      <tbody>
        {Object.values(stocks).map((stock, index) => {
          return (
            <StockRow
              count={index}
              key={stock.isin}
              stock={stock}
              selectedStock={selectedStock}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default PortfolioData;
