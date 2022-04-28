import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export const ListJobs = (jobData) => {
    const [modal, setModal] = useState({state:false, activeItem:{}});
    const [job_order, setJobOrder] = useState(jobData.jobData);

    // Update drag data
    const onDragEnd = result => {
        const {destination, source} = result;
        if (!destination){
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }
        const newList = Array.from(job_order);
        const [removed] = newList.splice(result.source.index, 1);
        newList.splice(result.destination.index, 0, removed);
        setJobOrder(newList);
        // updates sort int with index 
        newList.map((item,index) =>  {
            item.sort_int = index;
            return item;
        });
    }

    // sets the initial data on change
    useEffect(() => {
        setJobOrder(jobData.jobData);
      },[jobData]);

    //  updates the database when change happens
      useEffect(() => {
        if(job_order.length !== 0 ){
            // TODO: write message?
            axios.put("/sortupdate", {job_order},{ withCredentials: true}).then((response) => {
            });
        }
      },[job_order]);

      // Check for Status of Job
      let status = (status) => {
        if(status){
            return "🟢 Completed"    
        }
        return "🔴 In-Progress"
      }



    //   Modal View of Job
        const NewJobModal = () => {
            let item = modal.activeItem;

        const finishJob = () => {
            item.status = !item.status;
            console.log(item);
            setModal({activeItem:{...item}})
            axios.put("/finishjob", {item}, { withCredentials: true}).then((response) => {
            });

        }


        if(item == null){
            return(<></>)
        }else{
            return (
                <>
                  <Modal show={modal.state} fullscreen={true} onHide={() => setModal({state:false})}>
                    <Modal.Header closeButton>
                      <Modal.Title>Job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>Client: {item.client_name}</div>
                      <div>Email: {item.email}</div>
                      <div>Phone: {item.phone_num}</div>
                      <div>Address: {item.addr}</div>
                      
                      <div>Description: {item.job_description}</div>
                      <div>Sprinkers: {item.sprinklers}</div>
                      <div>Quote: {item.quote}</div>
                      <div>Job Status: {status(item.status)}</div>
                      <Button onClick={() => {setModal({state:!modal.state})}}>Close</Button>
                      <Button onClick={() => {finishJob()}}>Finish Job</Button>
                    </Modal.Body>
                  </Modal>
                </>
              );
        }
      }




    return(<div className="jobContainer">

        <div className="titleRow">
            <div>Name</div>
            <div>Address</div>
            <div>Status</div>
        </div>
        <NewJobModal/>
        <DragDropContext property="csp-nonce" onDragEnd={onDragEnd}>
            <Droppable droppableId="jobs">
                {(provided) => (<ul className="jobs"{...provided.droppableProps} ref={provided.innerRef}>
                        {
                       job_order.map((item,index) => {
                            return(
                            <Draggable key={item.job_id.toString()} draggableId={item.job_id.toString()} index={index}>
                                {(provided) => (
                                    <ul className="jobItem" onClick={() => {setModal({state:true, activeItem:item})}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                           <div className="jobInfo">
                                                <div className="clientName">
                                                    {item.client_name}
                                                </div>
                                                
                                                <div className="addr">
                                                    <a href={"https://maps.google.com/?q="+item.addr} onClick={(e)=> {e.stopPropagation()}}>
                                                        {item.addr}
                                                    </a>
                                                </div>
                                                <div className="status">
                                                    {status(item.status)}
                                                </div>
                                                
                                           </div>
                                    </ul>
                                )}
                            </Draggable>)
                        }) 
                        }
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    </div>)
}