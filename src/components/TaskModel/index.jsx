import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const TaskModel = () => {
    
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
      async function getTasks(){
          try{
              const newTask = await axios.get(`/${id}`)
              // console.log(student.data)
              setTasks(newTask.data)
          }catch(error){
              console.log('somthing wrong')
          }
      }    

      getTasks(id);
  }, [])
  return (
    <div>
         <Modal
        // show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Task Start</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TaskModel