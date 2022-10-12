import React, {useState, useEffect} from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Timer from 'components/Timer';
import { useSelector, useDispatch } from 'react-redux';
import { GetTask, successfulGetTask, DeleteTask} from 'redux/actions/AddTaskAction';


const TaskList = () => {

  const dispatch = useDispatch()

    useEffect(()=>{
       dispatch(GetTask());
    },[])
 
  // console.log(dispatch,"dispatch")
  // const [tasks, setTasks] = useState([]);
  const tasks = useSelector(state => state.first.getAllTasks.payload)

  const [show, setShow] = useState(false);
  const [first, setfirst] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = (task) =>{
      setfirst(task)
      setShow(true);
    } 
 
  

  // useEffect(()=>{
  //   async function getAllTasks(){
  //     try{
  //       const tasks = await axios.get("http://localhost:3001/tasks")
  //       console.log(tasks.data)
  //       setTasks(tasks.data)
  //     }catch(error){
  //       console.log("something wrong")
  //     }
  //   }

  //   getAllTasks();
  // },[])

  console.log(tasks,"tasksss")
   

  const handleDelete = (id)=>{
    dispatch(DeleteTask(id))
    var newTask = tasks.filter((item)=>{
          return item.id !== id;
        })
      //   // setTasks(newTask);
     dispatch(successfulGetTask(newTask))
  }
  
  // const handleDelete = async id =>{
  //   await axios.delete(`http://localhost:3001/tasks/${id}`)
  //   var newTask = tasks.filter((item)=>{
  //     return item.id !== id;
  //   })
  //   // setTasks(newTask);
  //   dispatch(successfulGetTask(newTask))
  // }
 
  const handleDragEnd = (results)=>{
    let temptask = [...tasks]
    let [selectedRow] = temptask.splice(results.source.index, 1);
      // console.log(results, "resultesss", selectedRow,"selected Row")
    temptask.splice(results.destination.index,0,selectedRow)
    // setTasks(temptask);
        
    dispatch(successfulGetTask(temptask))

    }

  return (
    <>
      <div style={{backgroundColor:'#747474', textAlign:'center'}}>
        <h3 style={{color:''}}>Task List</h3>
      </div>
      <Container>
        <DragDropContext onDragEnd={(results)=>handleDragEnd(results)}>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>End Date</th>
                <th>End Time</th>
                <th>Remove</th>
                <th>Start Task</th>
                <th></th>
              </tr>
            </thead>
            <Droppable droppableId="2">
              {(provided) =>(
                  <tbody className='tbody' ref={provided.innerRef} {...provided.droppableProps}>
                    {
                      tasks?.map((task, i)=>(
                        <Draggable draggableId={task.title} index={i} key={task.title}>
                            {(provided)=>(
                              <tr ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                <td>{task.id}</td>
                                <td style={{minWidth:'100px'}}>{task.title}</td>
                                <td style={{minWidth:'100px'}}>{task.endDate.slice(0,10)}</td>
                                {console.log(task.endDate.slice(0,10), "end Dateee")}
                                <td style={{minWidth:'100px'}}>{task.endTime}</td>
                                <td style={{minWidth:'100px'}}><button style={{border:'none'}} 
                                onClick={()=> handleDelete(task.id)}
                                ><i  className="fa-solid fa-trash"></i></button></td>
                                <td style={{minWidth:'100px'}}>
                                 <button className='startBtn' onClick={() => handleShow(task)}>Start</button> 
                                </td>
                                <td>{(i === 0)? 'High': (( i === 1 ) || i < tasks.length-2? 'medium': 'low')}</td>
                            </tr>
                            )}
                          </Draggable>
                      ) )
                    }
                    {provided.placeholder}
                </tbody>
                ) 
              } 
            </Droppable>
          
          </Table>
        </DragDropContext>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{first.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Timer 
            date= {first.endDate}
            time ={first.endTime}
           />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TaskList