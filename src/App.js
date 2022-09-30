import React from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import TaskSchedule from 'components/Task';
import TaskModel from 'components/TaskModel';

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<TaskSchedule/>} /> 
    </Routes>
  )
}

export default App