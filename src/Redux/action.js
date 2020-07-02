import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, UPDATE_TODO } from "./actionTypes"
import { v4 as uuidv4 } from 'uuid';


export const addTodo =payload=>({
    type:ADD_TODO,
    payload :{
        title:payload,
        status:false,
        id :uuidv4(),
        date : Date.now()
    }
})

export const toggleTodo = payload =>({
    type:TOGGLE_TODO,
    payload
})

export const deleteTodo = payload =>({
    type:DELETE_TODO,
    payload
})

export const updateTodo = payload =>({
    type:UPDATE_TODO,
    payload
})