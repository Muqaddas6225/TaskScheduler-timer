import { ActionTypes } from "redux/constants/action-types"

const initialState = {}

export const taskReducer = (state= {}, {type, payload})=>{
    switch(type){
        case ActionTypes.SET_TASK:
            console.log(payload,"state")
          return {...state, payload};
         case ActionTypes.FAILURE_TASK:
            console.log(payload,"failure")
            return{ ...state,payload};
        default:
            return state;
    }
}