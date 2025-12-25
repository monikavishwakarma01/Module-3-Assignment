import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Todos from "./Todos";
import TodoDetails from "./TodoDetails";
import ProtectedRoute from "./ProtectedRoute";
import "./index.css";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/todos/:todoId"
          element={
            <ProtectedRoute>
              <TodoDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
