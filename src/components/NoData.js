import React from "react";

function NoData({ count }) {
  console.log("duh");
  return count > 0 ? (
    <></>
  ) : (
    <div data-label="no-stocks" className="noData">
      There are currently no stock in your portfolio.
    </div>
  );
}

export default React.memo(NoData);
