import React, { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import Error from "./components/Error";
import NoData from "./components/NoData";
import "./App.css";
import PortfolioData from "./components/PortfolioData";

import { ISIN_REGEX } from "./constants";
function App() {
  const [ISIN, setISIN] = useState("");
  const [errorMessage, setError] = useState("");
  const connection = React.useRef(null);
  const [instruments, setInstruments] = useState({});

  const handleWhenMessageRec = (message) => {
    try {
      const dataFromSource = JSON.parse(message.data);
      let current_time = Date.now();
      setInstruments((prevState) => ({
        ...prevState,
        [dataFromSource.isin]: { ...dataFromSource, time: current_time },
      }));
    } catch (err) {
      console.log("Error occured while parsing the data");
    }
  };

  const totalPortSize = () => Object.keys(instruments).length;

  React.useEffect(() => {
    connection.current = new W3CWebSocket("ws://159.89.15.214:8080/");
    connection.current.onopen = () => {
      console.log("Connected to WebSocket Client Successfully.");
      // put status online offline here
    };
    connection.current.onmessage = handleWhenMessageRec;

    connection.current.onclose = () =>
      console.log("Disconnecting from client network.");
    const wsCurrent = connection.current;
    return () => {
      wsCurrent.close();
    };
  }, []);


  const valiDateAndSubmitISIN = () => {
    const isValidISIN = ISIN_REGEX.test(ISIN);
    if (isValidISIN) {
      setError("");
      if (connection.current) {
        connection.current.send(
          JSON.stringify({
            subscribe: `${ISIN}`,
          })
        );
        setISIN("");
      } else {
        setError("Connection to client is not completed");
      }
    } else {
      setError("Please enter ISIN in correct Format.");
    }
  };

  const setSelectedInstrument = (stock, e) => {
    if (connection.current) {
      connection.current.send(
        JSON.stringify({
          unsubscribe: `${stock.isin}`,
        })
      );

      console.log(`${stock.isin} is removed from your portfolio.`);
      const newIns = { ...instruments };
      delete newIns[stock.isin];
      e.target.innerText = "Removing...";
      setTimeout(() => setInstruments(newIns), 500);
    } else {
      setError("Cannot remove.Connection to client is not completed");
    }
  };

  return (
    <div className="App">
      <Header online={true} />
      {errorMessage.length > 0 && (
        <Error message={errorMessage} closeMsg={setError} />
      )}
      {/* <select value={portfolio} onChange={getValue} >
       {createPortfolioList()}
      </select> */}
      <InputSearch
        inputVal={ISIN}
        setInputVal={setISIN}
        validate={valiDateAndSubmitISIN}
      />
      <PortfolioData
        selectedStock={setSelectedInstrument}
        stocks={instruments}
      />
      <NoData count={totalPortSize()} />
    </div>
  );
}

export default App;
