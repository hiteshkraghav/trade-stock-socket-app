import React from "react";


// Shows any error encountered
function Error({ message, closeMsg }) {
  return (
    <div data-label="error-msg" className="errorMsg">
      {message}
      <span className={"btnClose"} onClick={() => closeMsg("")}>
        close
      </span>
    </div>
  );
}

export default Error;
