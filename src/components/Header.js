import React from 'react'
import { Detector } from "react-detect-offline";
import '../App.css';
function Header({online}) {
  return (
    <div className="Header">
      <div>Portfolio
    <Detector
            render={({ online }) => (
              <span className={`${online ?'connection-ac':'connection-iac'} connection-status`}>
                {online ? "Online" : "Offline"}
              </span>
            )}
          />
          </div>
   </div>
  )
}

export default Header