import React from "react";

function InputSearch(props) {
  
  const { inputVal, setInputVal, validate } = props;
  
  const setISINValue = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <div data-label="input-box" className="searchBox">
      <input
        className="inputBox"
        aria-label="isin-add-field"
        type="text"
        name="addISIN"
        value={inputVal}
        onChange={setISINValue}
        maxLength="12"
        placeholder="Enter ISIN"
      />
      <button data-label="isin-enter-button" className="btnSubmitISIN" onClick={validate}>
        ADD ISIN
      </button>
    </div>
  );
}

export default InputSearch;
