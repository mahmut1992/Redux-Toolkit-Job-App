import React from "react";
import "./error.scss";

const Error = ({ info }) => {
  return (
    <div className="tv-container">
      <div className="tv-screen">
        <div className="static"></div>
        <div className="error-text">{info} </div>
      </div>
      <div className="tv-stand"></div>
    </div>
  );
};

export default Error;
