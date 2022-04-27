import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Select from 'react-select';

export const TimeComponent = (data) => {
    const [buttonState, setButtonState] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    console.log(data)

    useEffect(() => {
        setStartTime(data.data[1]);
        setEndTime(data.data[2]);
    },[data.data])

    const handleTime = () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        if (startTime === undefined){
            setStartTime(dateTime);
        }else{
          if (endTime === undefined){
            setEndTime(dateTime);
          }
          else{
            setButtonState(false);
          }
        }
      }



    return( 
    <Container>
        <div>
            <Select options={data.data[0]} />
            {startTime}
            <br/>
            {endTime}
            <Button disabled={buttonState} onClick={handleTime} >Start/End</Button>
        </div>
        <Button >
          New Employee
        </Button>
    </Container>)
}