import React from "react";

function Error({ message, closeMsg }) {
  return (
    <div data-label="error-msg" className="errorMsg">
      {message}
      <span className={"btnClose"} onClick={() => closeMsg("")}>
        clear
      </span>
    </div>
  );
}

export default Error;
