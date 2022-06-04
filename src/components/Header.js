import React from 'react'
import { Detector } from "react-detect-offline";
import '../App.css';
function Header({online}) {
  return (
    <div className="Header">Portfolio
    <Detector
            render={({ online }) => (
              <span className={online ?'connection-ac':'connection-iac'}>
                {online ? "Online" : "Offline"}
              </span>
            )}
          />
   </div>
  )
}

export default Header