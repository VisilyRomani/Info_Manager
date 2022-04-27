import React, { useEffect, useState } from "react";
import {Button, Container} from "react-bootstrap";
import Select from 'react-select'
import { TimeComponent } from "../components/reusable/TimeComponent";
import axios from "axios";

// TODO: create line that has drop down for employee then start and end time. 
  // once start is pressed then send current time to database.
  // once end is pressed send end time to database
  // below show a button to add a new employee
//  Below  show a input date then a table for finished information.
function TimeSheet() {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [timeSheet, setTimeSheet] = useState([]);
  const [Employee, setEmployee] = useState([]);

  const fetchClient = () => {
    axios.get("/employee",{ withCredentials: true }).then((response)=>{
      let preData = response.data;
      console.log(preData);
      let postData = [];
      preData.map((item, index) => {
        return postData.push({value: item.id, label:item.first_name + " " +item.last_name });
      })
      setEmployee(postData);
  }).catch((err) => {
    console.log(err);
  });
  }

  const fetchTimeSheet = () => {
    axios.get("/timesheet",{ withCredentials: true }).then((response)=>{
      console.log(response.data);
      setTimeSheet(response.data)
  }).catch((err) => {
    console.log(err);
  });
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      fetchClient();
      fetchTimeSheet();
    }
      return () => {
        setEmployee([]);
        isMounted = false;}
  },[]);


  return (
    <div>
      <h1>Time Sheet</h1>
      <TimeComponent data={[Employee, Date(), Date()]} />
    </div>
  );
}

export default TimeSheet;
