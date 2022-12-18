import React from "react";

function OrderSuccess() {
  return (
    <div
      style={{ 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          width: "40%",
          height: "40%",
          objectFit: "contain",
          margin: "2rem auto",
          borderRadius: "0.5rem",
        }}
        src="images/order_completed.jpg"
        alt=""
      />
    </div>
  );
}

export default OrderSuccess;
