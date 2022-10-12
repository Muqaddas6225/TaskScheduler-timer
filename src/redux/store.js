import { createStore } from 'redux'
import {configureStore } from '@reduxjs/toolkit'
import { myreducer } from "./reducers"
// import {taskReducer} from './reducers/taskReducer'

const store = configureStore({
    reducer  : {
        first : myreducer
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store