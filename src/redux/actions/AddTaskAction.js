import { ActionTypes } from "redux/constants/action-types";
import axios from "axios";
import React,{useEffect} from "react";

export const LoadingData = () => ({
    type: ActionTypes.PENDING_TASK
})

export const successfulTask = (data) => ({
    type : ActionTypes.SET_TASK,
    payload: data
})


export const failureTask = (error) => ({
    type : ActionTypes.FAILURE_TASK,
    payload : error
}) 


export const successfulGetTask = (data) => ({
    type : ActionTypes.GET_TASK,
    payload: data
})

export const successfulDeleteTask = (data) => ({
  type : ActionTypes.DELETE_TASK,
  payload: data
})


export const setTask = (tasks) => async (dispatch) => {
    dispatch(LoadingData())
     try{
        let res = await axios.post(`http://localhost:3001/tasks`, tasks)
        dispatch(successfulTask(res.statusText))
      }catch(error){
        dispatch(failureTask(error))
      }
}

export const GetTask = () => async (dispatch) => {
    dispatch(LoadingData())
      try{
        const tasks = await axios.get("http://localhost:3001/tasks")
        console.log(tasks.data)
        dispatch(successfulGetTask(tasks.data))
        // setTasks(tasks.data)
      }catch(error){
        dispatch(failureTask(error))
        console.log("something wrong")
      }
    }

export const DeleteTask = (id) => async (dispatch) => {
   
    dispatch(LoadingData())
      try{
        const tasks =  await axios.delete(`http://localhost:3001/tasks/${id}`)
        console.log(tasks)
        dispatch(successfulDeleteTask(tasks.statusText))
        // setTasks(tasks.data)
      }catch(error){
        dispatch(failureTask(error))
        console.log("something wrong")
      }
    }



  export const UpdateTask = (id) => async (dispatch) => {
      dispatch(LoadingData())
        try{
          const tasks = await axios.put(`http://localhost:3001/tasks/${id}`)
          console.log(tasks.data)
          dispatch(successfulGetTask(tasks.data))
          // setTasks(tasks.data)
        }catch(error){
          dispatch(failureTask(error))
          console.log("something wrong")
        }
      }
  

