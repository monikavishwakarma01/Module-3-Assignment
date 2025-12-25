import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.slice(0, 10)));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Todos</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="todo-grid">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="todo-card"
            onClick={() => navigate(`/todos/${todo.id}`)}
          >
            <h4>{todo.title}</h4>
            <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;
