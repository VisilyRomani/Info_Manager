import { CommandCompleteMessage } from "pg-protocol/dist/messages";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

export const ListJobs = (jobData) => {

    const onDragEnd = result => {
        console.log(result);
        const {destination, source, draggableId} = result;
        if (!destination){
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }

        // console.log(jobData)
        // const newList = [...jobData.jobData];
        // console.log(newList)
        // const [removed] = newList.splice(result.source.index, 1);
        // newList.splice(result.destination.index, 0, removed);
        // jobData = newList;
    }

// TODO:Move some of this crap into the partent Home file
    return(<div className="jobContainer">
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="jobs">
                {(provided) => (<ul className="jobs"{...provided.droppableProps} ref={provided.innerRef}>
                        {
                       jobData.jobData.map((item,index) => {
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