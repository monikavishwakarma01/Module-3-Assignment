import Todos from "./components/Todos";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Todos />
    </TodoProvider>
  );
}

export default App;
