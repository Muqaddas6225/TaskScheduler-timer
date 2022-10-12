import { ActionTypes } from "redux/constants/action-types"

const initialState = {
    tasks:[]
}

export const getTaskReducer = (state= {initialState}, {type, payload})=>{
    switch(type){
        case ActionTypes.GET_TASK:
            console.log(payload,"state")
          return {...state, payload};
         case ActionTypes.FAILURE_TASK:
            console.log(payload,"failure")
            return{ ...state,payload};
        default:
            return state;
    }
}