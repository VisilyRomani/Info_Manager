import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import React, {useState, useEffect} from 'react';

import { NewJobModal } from "../components/reusable/NewJobModal";
import axios from "axios";
import { render } from "@testing-library/react";
export const ListJobs = (jobData) => {
    const [job_order, setJobOrder] = useState(jobData.jobData);
    const onDragEnd = result => {
        console.log(result);
        const {destination, source, draggableId} = result;
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
            axios.put("/sortupdate", {job_order},{ withCredentials: true}).then((response) => {
            });
          }
      },[job_order]);

      let status = (status) => {
        if(status){
            return "Completed"    
        }
        return "In-Progress"
      }

      let click = () => {
        // console.log("click")
        render(<NewJobModal/>)
      }

    return(<div className="jobContainer">
        <div className="titleRow">
            <div>Name</div>
            <div>Address</div>
            <div>Status</div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="jobs">
                {(provided) => (<ul className="jobs"{...provided.droppableProps} ref={provided.innerRef}>
                        {
                       job_order.map((item,index) => {
                            return(
                            <Draggable key={item.job_id.toString()} draggableId={item.job_id.toString()} index={index}>
                                {(provided) => (
                                    <ul className="jobItem" onClick={click} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                       
                                        {/* TODO: Put client name and job description here */}
                                           <div className="jobInfo">
                                                <div className="clientName">
                                                    {item.client_name}
                                                </div>
                                                
                                                <div className="addr">
                                                    <a href={"https://maps.google.com/?q="+item.addr}>
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