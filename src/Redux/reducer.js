import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "./actionTypes"
import { loadData } from "./localStorage";

export const initState = loadData("initState") || {
    todo: [],
    completed: []
}

export default (state = initState, {type, payload})=>{
    switch(type){
        case ADD_TODO :{
            return {
                ...state,
                todo : [...state.todo, payload].sort((a,b)=>b.date - a.date)
            }
        }
        case DELETE_TODO :{
            return{
                ...state,
                todo : state.todo.filter(item=>item.id !== payload),
                completed : state.completed.filter(item=>item.id !== payload)
            }
        }
        case TOGGLE_TODO :{
            return{
                ...state,
                todo : state.todo.map(item=>item.id === payload.id ? {...item, status : !item.status} : item),
                completed : [...state.completed, payload]
            }
        }
        case UPDATE_TODO:{
            return{
                ...state,
                todo: state.todo.map(item=> item.id === payload.id ? payload : item)
            }
        }
        default :{
            return {...state}
        }
    }
}