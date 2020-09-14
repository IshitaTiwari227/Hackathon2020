import React from "react";
import "./style.css";

export default ({ left, top, pos = "top", children }) => {
  return (
    <div className={`tooltip tooltip--${pos}`} style={{ left: `${left}px`, top: `${top}px` }}>
      {children}
    </div>
  );
};
