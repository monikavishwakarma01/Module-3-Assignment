import { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext'



function AddTodo() {

    const { addTodo } = useContext(TodoContext)
    const [task, setTask] = useState("")

    const handleAdd=()=>{
      if (task.trim() === "") return;
      addTodo(task);
      setTask("");
    }
  return (
    <div className="add-todo">
        <input type="text" placeholder='Enter task' value={task} onChange={(e) => setTask(e.target.value)}/>
        <button onClick={handleAdd}>Add todo</button>
    </div>
  )
}

export default AddTodo