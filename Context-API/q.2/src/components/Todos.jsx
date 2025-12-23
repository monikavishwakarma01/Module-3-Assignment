import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

function Todos() {
  return (
   <div className="todo-app">
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default Todos;
