import React from "react";

function TodoCard({ userId, title, completed }) {
  return (

     <div style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "6px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: completed ? "#08b831ff" : "#f7ac34c0",
        }}>
        <p><b>User ID:</b> {userId}</p>
        <p><b>Title:</b> {title}</p>
        <p><b>Completed:</b> {completed ? "Yes" : "No"}</p>
     </div>
  
  );
}

export default TodoCard;
