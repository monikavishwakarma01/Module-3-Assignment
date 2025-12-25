import { useParams } from "react-router-dom";

function TodoDetails() {
  const { todoId } = useParams();

  return (
    <div>
      <h2>Todo Details Page</h2>
      <p>Todo ID: {todoId}</p>
    </div>
  );
}

export default TodoDetails;
