import React from "react";

function Error({ message }) {
  return (
    <div
      style={{
        color: "red",
        margin: "3px",
        paddingBottom: "1px",
        paddingLeft: "40px",
        fontWeight: "bold",
      }}
    >
      <span>{message}</span>
    </div>
  );
}

export default Error;
