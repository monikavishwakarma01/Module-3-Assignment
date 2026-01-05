import React from 'react'
import { getTodos } from '../api/todoService'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function TodoList() {
      const[todos, setTodos]=useState([])

  useEffect(()=>{
    getTodos()
     .then((res)=>{
      setTodos(res.data)
     })
     .catch((error)=>{
      console.error(error)
     })
  },[])

  return (
    <div>
      <h2>Todo list</h2>
         {
          todos.map((todo)=>(
            <div key={todo.id}>
                  <Link to={`/todo/${todo.id}`}>
                          <h4>{todo.title}</h4>
                  </Link>
                  <p>Status: {todo.completed ? "Completed" : "pending"}</p>
            </div>
          ))
         }
    </div>
  )
}

export default TodoList