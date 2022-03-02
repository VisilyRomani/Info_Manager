import { CommandCompleteMessage } from "pg-protocol/dist/messages";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import React, {useState, useEffect} from 'react';
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
        });
    }

    useEffect(() => {
        setJobOrder(jobData.jobData);
        // TODO: check that this is proper data then update the database if it is
        console.log(job_order);
      },[jobData]);

    return(<div className="jobContainer">
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="jobs">
                {(provided) => (<ul className="jobs"{...provided.droppableProps} ref={provided.innerRef}>
                        {
                       job_order.map((item,index) => {
                            return(
                            <Draggable key={item.job_id.toString()} draggableId={item.job_id.toString()} index={index}>
                                {(provided) => (
                                    <li className="jobItem" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {/* TODO: Put client name and job description here */}
                                           <div className="jobInfo">
                                                {'Client Name: ' + item.client_name}

                                                <a href={"https://maps.google.com/?q="+item.addr}>
                                                    {item.addr}
                                                </a>

                                                {'Job Description: ' + item.job_description}
                                           </div>
                                    </li>
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