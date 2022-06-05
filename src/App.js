import React, { useState } from "react";
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import Error from "./components/Error";
import NoData from "./components/NoData";
import "./App.css";
import PortfolioData from "./components/PortfolioData";

import { ISIN_REGEX, SOCKET_ENDPOINT } from "./constants";

function App() {
  // Component states to hold the incoming socket data

  const [ISIN, setISIN] = useState("");
  const [errorMessage, setError] = useState("");
  const connection = React.useRef(null);
  const [instruments, setInstruments] = useState({});

  // Method to handle all the data coming from the socket connection
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

  // Gives the current size of the watchlist.
  const totalPortSize = () => Object.keys(instruments).length;

  // Mount/unmount method to connect to socet

  React.useEffect(() => {
    connection.current = new W3CWebSocket(SOCKET_ENDPOINT);
    connection.current.onopen = () => {
      console.log("Connected to WebSocket Client Successfully.");
    };

    connection.current.onmessage = handleWhenMessageRec;

    connection.current.onclose = () =>
      console.log("Disconnecting from client network.");

    // connection.current._connection.on("error", (err) => alert("error",err));

    const wsCurrent = connection.current;
    return () => {
      wsCurrent.close(); //close socket connection when the component unmounts.
    };
  }, []);

  // New ISIN Subscribe method

  const valiDateAndSubmitISIN = () => {
    const isValidISIN = ISIN_REGEX.test(ISIN);
    if (isValidISIN) {
      setError("");
      try {
        if (connection.current) {
          const presentISIN = Object.keys(instruments).includes(ISIN);
          if (presentISIN) {
            setError("ISIN already present in watchlist.");
            return;
          }
          connection.current.send(
            JSON.stringify({
              subscribe: `${ISIN}`,
            })
          );
          setISIN("");
        } else {
          setError("Connection to client is not completed.");
        }
      } catch (e) {
        setError("Connection to faile withe message", e);
      }
    } else {
      setError("Please enter correct ISIN format.");
    }
  };

  // Un-subscribe to present ISIN in watchlist
  const setSelectedInstrument = (stock, e) => {
    if (connection.current) {
      try {
        connection.current.send(
          JSON.stringify({
            unsubscribe: `${stock.isin}`,
          })
        );
      } catch (e) {
        setError("Failed to unsubscribe from ISIN", e);
        return;
      }

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
