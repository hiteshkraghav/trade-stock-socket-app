import React, { useState, useRef, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function useWebsocket() {
  const connection = useRef(null);

  const [instruments, setInstruments] = useState({});
  const [errorMessage, setError] = useState("");

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

  React.useEffect(() => {
    connection.current = new W3CWebSocket("ws://159.89.15.214:8080/");
    connection.current.onopen = () => {
      console.log("Connected to WebSocket Client Successfully.");
    };

    connection.current.onmessage = handleWhenMessageRec;
    connection.current.onclose = () =>
      console.log("Disconnecting from client network.");
    const wsCurrent = connection.current;
    return () => {
      wsCurrent.close();
    };
  }, []);
  const subscribeToIsin = (ISIN) => {
    if (connection.current) {
      connection.current.send(
        JSON.stringify({
          subscribe: `${ISIN}`,
        })
      );
    } else {
      setError("Connection to client is not completed");
    }
  };
  const unsubscribeToIsin = (ISIN) => {
    if (connection.current) {
      connection.current.send(
        JSON.stringify({
          unsubscribe: `${ISIN}`,
        })
      );

      console.log(`${ISIN} is removed from your portfolio.`);
      const newIns = { ...instruments };
      delete newIns[ISIN];
      // e.target.innerText='Removing...'
      setTimeout(() => setInstruments(newIns), 500);
    } else {
      setError("Cannot remove.Connection to client is not completed");
    }
  };

  return {
    connection,
    instruments,
    setInstruments,
    subscribeToIsin,
    unsubscribeToIsin,
    errorMessage,
  };
}

export default useWebsocket;
