import { combineReducers } from "redux";
import { taskReducer} from "./taskReducer";
import { getTaskReducer } from "./getTaskReducer";

export const myreducer = combineReducers({
    allTasks : taskReducer,
    getAllTasks : getTaskReducer
})