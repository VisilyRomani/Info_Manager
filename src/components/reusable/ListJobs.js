import { CommandCompleteMessage } from "pg-protocol/dist/messages";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
export const ListJobs = (jobData) => {

// TODO: Create a dynanimcally generated list of jobs with react beautiful DnD
    return(<div>
        <DragDropContext>
            <Droppable droppableId="jobs">
                {(provided) => (
                    <ul className="jobs" {...provided.droppableProps} ref={provided.innerRef}>
                        {
                    //    console.log(jobData)
                       jobData.jobData.map(({job_id, addr, client_name, job_description},index) => {
                            return(
                            <Draggable key={job_id} draggableId={job_id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div className="inner-job">
                                            <a href={"https://maps.google.com/?q="+addr}>
                                                {addr}
                                            </a>
                                        </div>
                                    </li>
                                )}
                            </Draggable>)
                        }) 
                        }
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    </div>)
}