import instance from './axiosInstance'

export  const getTodos=()=>{
    return instance.get("/todos")
}

export const  getTodoById=(id)=>{
    return instance.get(`/todos/${id}`)
}