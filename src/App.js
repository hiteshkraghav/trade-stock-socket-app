import React, { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import Error from "./components/Error";
import "./App.css";
import PortfolioData from'./components/PortfolioData';
/**
 * 
 *  {
 * WATCHLIST_NAME :{ 
 *                   count : how many stocks; 
 *                   stocks:{ 
 *                            isin : {}
 *                          
 *                          }
 *                   
 *                  }
 * 
 * }
 * 
 */
import { ISIN_REGEX, MAX_PORTFOLIO } from "./constants";
function App() {
  const [ISIN, setISIN] = useState("");
  const [errorMessage, setError] = useState("");
  const [toBeRemoved,removeISIN]=useState("");
  // const [selectWatch,setSelectWatch]=useState('default');
  // const [ watchlist,createWatchlist]=useState({});
  // const [selectedInstrument,setSelectedInstrument] = useState({});
  const connection= React.useRef(null);
  // const selectedPortfolio= React.useRef('default');
  
  const [instruments,setInstruments] = useState({});
  

  const handleWhenMessageRec = (message) => {
    try {
//       console.info("portfolio value is ",portfolio);
//       console.info("selectedPortfolioWatchlist.current is ",selectedPortfolio.current);
// const portfolio = selectedPortfolio.current;
      
      // let watch_temp={...watchlist};
      let current_time = Date.now();
      const dataFromSource = JSON.parse(message.data);
      // let current_watchlist=watchlist[portfolio];
      //////////////////////////////////////////////////////////////////////////////////////////////
      // if(!watch_temp[watch_temp])
      // {
      //   watch_temp[portfolio]={ count :1,stocks:{}};
      //   watch_temp[portfolio].stocks[dataFromSource.isin] = dataFromSource;

      // }
      // else if(current_watchlist.count<5) {
      //   watch_temp.portfolio.stocks[dataFromSource.isin] = dataFromSource;
      //   watch_temp.portfolio['count']=watch_temp.portfolio['count'] + 1;
      // }
      // else
      //   console.log(" max conunt reached for portfolio stocks.");
      //   createWatchlist(watch_temp);
      //   console.log("->",watch_temp);
      //   createWatchlist((prevState) => ({
      //     ...prevState,
      //     ...watch_temp
      //   }));
  //////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
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
    console.log("****",connection.current);
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
  console.log("****",connection.current);
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
 
//   const getValue = (event) => {
//     setSelectWatch(event.target.value);
//     selectedPortfolio.current=event.target.value;
//   };
// const  createPortfolioList=()=>{
//   let portf=[];
//   portf.push(<option value="default">Default</option>)
//   for (let i=1;i<MAX_PORTFOLIO;i++) {
//       portf.push( <option onClick={getValue} value={`portfolio-${i}`}>{`portfolio-${i}`}</option>)
//   }
//   return portf;
// }
  const setSelectedInstrument =(stock,event)=>{
    if(connection.current)
    {
       connection.current.send(
       JSON.stringify({
        unsubscribe: `${stock.isin}`,
      })
    );

    console.log(`${stock.isin} is removed from your portfolio.`, event);
    event.target.innerText ='Removing..';
    const newIns={...instruments};
    removeISIN(stock.isin);
    delete newIns[stock.isin];
  
    setTimeout(()=>setInstruments(newIns),500);
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
      {/* <select value={selectWatch} onChange={getValue}>
       {createPortfolioList()}
      </select> */}
    </div>
  );
}

export default App;
