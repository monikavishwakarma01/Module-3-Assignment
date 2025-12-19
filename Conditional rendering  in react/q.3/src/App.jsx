import React, { useState } from "react";
import TodosList from "./components/TodosList";

function App() {
  const [showTodos, setShowTodos] = useState(true);

  return (
    <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
      <button
        onClick={() => setShowTodos(!showTodos)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        {showTodos ? "Unmount Todos" : "Mount Todos"}
      </button>

      {showTodos && <TodosList />}
    </div>
  );
}

export default App;
