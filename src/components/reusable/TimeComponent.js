import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Select from 'react-select';

// TODO: change the data management of this component
  // button state works
export const TimeComponent = ({listEmployee, timeData}) => {
    const [buttonState, setButtonState] = useState(false);

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [employee, setEmployee] = useState({});
    const [jobId, setJobId] = useState();

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
          if (timeData){
            console.log(timeData)
            setStartTime(timeData.start_time);
            setEndTime(timeData.end_time);
            setEmployee({id:timeData.employee_id, first_name:timeData.first_name, last_name:timeData.last_name });
            setJobId(timeData.timesheet_id);
          }
        }
        return () => {
          setEmployee();
          setEndTime();
          setStartTime()
          setJobId();
          isMounted = false;}
    },[timeData]);
  

    const sendStartTime = async (time) => {
      console.log(employee)
      await axios.post("/starttime", [employee, time], {withCredentials: true }).then((response) => {
      }).catch((err) => {
        console.log(err);
      });
    }

    const sendEndTime = async (time) => {
      console.log(jobId);
      await axios.post("/endtime", [employee, time, jobId], {withCredentials: true }).then((response) => {
      }).catch((err) => {
        console.log(err);
      });
    }


    const handleTime = () => {
        let curTime = new Date();
        if(employee !== undefined){
          if (startTime == undefined){
            setStartTime(curTime);
            sendStartTime(curTime);
            return
          }
          if (endTime == undefined){
            setEndTime(curTime);
            sendEndTime(curTime);
          }
          else{
            setButtonState(false);
          }
        
        }
    }

    const formatDateTime = (dateData) => {
      if(dateData){

        let DateTime = new Date(dateData);
        return DateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        // let date = DateTime.getFullYear()+'-'+(DateTime.getMonth()+1)+'-'+DateTime.getDate();
        // let time = DateTime.getHours() + ":" + DateTime.getMinutes()
        // console.log(DateTime)

        // function tConvert (time) {
        //   // Check correct time format and split into components
        //   time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        
        //   if (time.length > 1) { // If time format correct
        //     time = time.slice (1);  // Remove full string match value
        //     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        //     time[0] = +time[0] % 12 || 12; // Adjust hours
        //     console.log(time)
        //   }
        //   return time.join (''); // return adjusted time or original string
        // }

        // return date+' '+tConvert(time);
      }
    }


    return( 
    <Container>
        <div className="TimeObject">
            {(timeData) ? (
              employee.first_name + " " + employee.last_name
            ):(
              <Select options={listEmployee} onChange= {(options) => {setEmployee(options)}} className="employeeSelect"/>
            )}
            <div>Start: {formatDateTime(startTime)}</div>
            <div>End: {formatDateTime(endTime)}</div>
            <Button disabled={buttonState} onClick={handleTime} >Start/End</Button>
        </div>
    </Container>
    )

  }