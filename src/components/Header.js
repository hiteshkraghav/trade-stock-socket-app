import React from "react";
import { Detector } from "react-detect-offline";
import "../App.css";

// Detects and highlights whether the system is online or offline.
function Header({ online }) {
  return (
    <div data-label="portfolio-header" className="Header">
      <div>
        Portfolio
        <Detector
          render={({ online }) => (
            <span
              className={`${
                online ? "connection-ac" : "connection-iac"
              } connection-status`}
            >
              {online ? "Online" : "Offline"}
            </span>
          )}
        />
      </div>
    </div>
  );
}

export default Header;
