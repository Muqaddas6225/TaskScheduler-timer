import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import {setTask} from "../../redux/actions/AddTaskAction"
import "react-datepicker/dist/react-datepicker.css";

import TaskList from "components/List";

const TaskSchedule = () => {
  const [endDate, setEndDate] = useState(new Date());
  const [tasks, setTasks] = useState({
    title :'',
    endDate:'',
    endTime:'',
  })
  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState();
  const dispatch= useDispatch()
  const selector = useSelector((state)=>state)
  console.log(selector.first.allTasks, "selector")

  function onTextFieldChange(e){
    setTasks({
      ...tasks,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = (e) =>{
    e.preventDefault()
    validateInput(tasks)
  }

  const validateInput = async (values)=>{
    setFormErrors({})
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.endDate) {
      errors.endDate = "End Date is required!";
    }
    if (!values.endTime) {
      errors.endTime = "End Time is required!";
    }

    if(Object.keys(errors).length === 0){
       dispatch(setTask(tasks))
       alert(selector.first.allTasks.payload)
      // try{
      //   let res = await axios.post(`http://localhost:3001/tasks`, tasks)
      //   console.log(res, "res")
      //   setStatus(true);
      // }catch(error){
      //   console.log('something wrong')
      // }
    }
    else {
      setFormErrors(errors)
    }
  }

  if(status){
    return <TaskSchedule/>
  }

  return (
    <>
      <Container>
        <div>
          <Row className="taskScheduler">
            <h1>Task Scheduler</h1>
          </Row>
        </div>
        <Row>
          <Col lg={4} style={{marginBottom:"15px"}}>
            <form action="submit" className="EnterTask">
            <div style={{backgroundColor:'#747474', textAlign:'center'}}>
                <h3>Enter New task</h3>
            </div>
              <label for="title" ><h3>Title: </h3></label>
              <input
                className="taskInputs"
                type="text"
                name="title"
                placeholder="Enter task Title"
                onChange={e => onTextFieldChange(e)}
                // style={{width:"100%"}}
              />
               <p style={{color:'red', margin:'0'}}>{formErrors?.title}</p>
             
              <Row style={{display:"flex", gap:'10px', flexWrap :'wrap', flexDirection :'row'}} >
                <Col style={{display:"flex", gap:"10px"}}>
                  <label htmlFor="endTime" ><h4>Time: </h4></label>
                  <input
                    className="taskInputs"
                    type="time"
                    name="endTime"
                    placeholder="09:30 PM"
                    style={{width:"100%"}}
                    onChange={e=>onTextFieldChange(e)}
                  />
                   <p style={{color:'red'}}>{formErrors?.endTime}</p>
             
                </Col>
                <Col style={{display:"flex", gap:"10px"}}>
                <label htmlFor="" ><h4>Date: </h4></label>
                  <DatePicker
                    className="taskInputs"
                    selected={endDate}
                    minDate={new Date()}
                    onChange={(date) => {
                      // const time = Number(tasks.endTime);
                      // date.setTime(time)
                      setEndDate(date)
                      // const month = date.getMonth() + 1;
                      // const Date = date.getDate();
                      // const year = date.getFullYear();
                      // const FinaleDate = `${month}/${Date}/${year}`;
                      

                    //  const data = date.setTime(time);
                      
                      setTasks({
                        ...tasks,
                        'endDate': date,
                      }
                      )
                     
                      console.log(date)
                      }}
                  />
                   <p style={{color:'red'}}>{formErrors?.endDate}</p>
             
                </Col>
              </Row>
              <div>
                <button className="addButton" type="submit"
                 onClick={(e)=>onFormSubmit(e)} 
                >ADD</button>
              </div>
            </form>
          </Col>

          <Col lg={8}>
            <TaskList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TaskSchedule;
