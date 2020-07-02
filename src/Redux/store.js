import { createStore } from "redux";
import reducer from "./reducer";
import { saveData } from "./localStorage";

export const store = createStore(reducer)

store.subscribe(()=>saveData('initState', store.getState()))