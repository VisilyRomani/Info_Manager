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

  // TODO: FIx error in end part of the update for end time
  // probabaly server side
  // actually def server side
  // cool beans
    useEffect(() => {

        // let preEmpData;
        // if (tData){
        //   preEmpData = {value: tData.employee_id, label: tData.first_name + " " + tData.last_name}
        // }

        // setStartTime(tData.start_time);
        // setEndTime(tData.end_time);
        // setEmployee(preEmpData)
        let isMounted = true;
        if(isMounted){
          if (timeData){
            setStartTime(timeData.start_time);
            setEndTime(timeData.end_time);
            setEmployee({employee, id:timeData.employee_id, first_name:timeData.first_name, last_name:timeData.last_name });
          }
          console.log(timeData);
        }
        return () => {
          setEmployee();
          setEndTime();
          setStartTime()
          isMounted = false;}
    },[]);
  

    const updateInfo = (pos, time) => {
      axios.post("/updateTime", [employee, pos, time], {withCredentials: true }).then((response) => {
      }).catch((err) => {
        console.log(err);
      });
    }


    const handleTime = () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        console.log(employee)
        if(employee != undefined){
          if (startTime === undefined){
            setStartTime(dateTime);
            updateInfo("start", dateTime);
          }
          if (endTime == undefined){
            setEndTime(dateTime);
            updateInfo("end", dateTime);
            console.log(dateTime)
          }
          else{
            setButtonState(false);
          }
        
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
            <div>Start: {startTime}</div>
            <div>End: {endTime}</div>
            <Button disabled={buttonState} onClick={handleTime} >Start/End</Button>
        </div>
    </Container>
    )

  }