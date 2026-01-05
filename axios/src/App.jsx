import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import TodoList from './pages/TodoList'
import TodoDetails from './pages/TodoDetails'

function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<TodoList/>}/>
         <Route path="/todo/:id" element={<TodoDetails/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
