import React, { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import Error from "./components/Error";
import "./App.css";
import PortfolioData from'./components/PortfolioData';

import { ISIN_REGEX, MAX_PORTFOLIO } from "./constants";
function App() {
  const [ISIN, setISIN] = useState("");
  const [errorMessage, setError] = useState("");
  const [portfolio,setPortfolioName]=useState('default');
  console.log("portfolio",portfolio.length);
  // const [selectedInstrument,setSelectedInstrument] = useState({});
  const connection= React.useRef(null);
  const [instruments,setInstruments] = useState({});
  const handleWhenMessageRec = (message) => {
    try {
      const dataFromSource = JSON.parse(message.data);
      let current_time = Date.now();
      setInstruments((prevState) => ({
        ...prevState,
        [dataFromSource.isin]: {...dataFromSource,'time':current_time},
      }));
     
    } catch (err) {
      console.log("Error occured while parsing the data");
    }
  };



  React.useEffect(()=>{
    connection.current = new W3CWebSocket("ws://159.89.15.214:8080/");
    connection.current.onopen = () => {
      console.log("Connected to WebSocket Client Successfully.");
      // put status online offline here
    };
    connection.current.onmessage = handleWhenMessageRec;

    connection.current.onclose = () => console.log("Disconnecting from client network.");
    const wsCurrent = connection.current;
    return () => {
      wsCurrent.close();
    };
  },[]);

  const valiDateAndSubmitISIN = () => {
  const isValidISIN = ISIN_REGEX.test(ISIN);
    if (true) {
      setError("");
      if(connection.current)
      {
         connection.current.send(
        JSON.stringify({
          subscribe: `${ISIN}`,
        })
      );

      }
      else{
        setError("Connection to client is not completed");
      }
      // // make Api call to socket.
      // setError(false);
    } else {
      setError("Enter Correct ISIN Format!!");
    }
  };
 
  const getValue = (event) => {
    setPortfolioName(event.target.value);
  };
const  createPortfolioList=()=>{
  let portf=[];
  portf.push(<option value="default">Default</option>)
  for (let i=1;i<MAX_PORTFOLIO;i++) {
      portf.push( <option onClick={getValue} value={`portfolio-${i}`}>{`portfolio-${i}`}</option>)
  }
  return portf;
}
  const setSelectedInstrument =(stock)=>{
    if(connection.current)
    {
       connection.current.send(
       JSON.stringify({
        unsubscribe: `${stock.isin}`,
      })
    );

    console.log(`${stock.isin} is removed from your portfolio.`);
    const newIns={...instruments};
    delete newIns[stock.isin];
  
    setInstruments(newIns);
    }
    else{
      setError("Cannot remove.Connection to client is not completed");
    }
  }
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
      <PortfolioData selectedStock={setSelectedInstrument} stocks={instruments}/>
      <select value={portfolio} onChange={getValue}>
       {createPortfolioList()}
      </select>
    </div>
  );
}

export default App;
