import React, { useState } from "react";

function ColorToggle() {
  const [isRed, setIsRed] = useState(true);

  const toggleColor = () => {
    setIsRed(!isRed);
  };

  const divStyle = {
    width: "200px",
    height: "100px",
    lineHeight: "100px",
    textAlign: "center",
    color: "white",
    backgroundColor: isRed ? "red" : "blue",
    margin: "20px auto",
    borderRadius: "8px",
    fontSize: "18px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={divStyle}>This is a colored div</div>
      <button
        onClick={toggleColor}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#333",
          color: "white",
          cursor: "pointer",
        }}
      >
        Toggle Color
      </button>
    </div>
  );
}

export default ColorToggle;
