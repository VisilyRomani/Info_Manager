import React, { useEffect, useState } from "react";
import {Button, } from "react-bootstrap";
import { TimeComponent } from "../components/reusable/TimeComponent";
import axios from "axios";
import "../css/TimeSheet.css"
// TODO: create line that has drop down for employee then start and end time. 
  // once start is pressed then send current time to database.
  // once end is pressed send end time to database
  // below show a button to add a new employee
//  Below  show a input date then a table for finished information.
function TimeSheet() {
  const [timeSheet, setTimeSheet] = useState([]);
  // list of employee
  const [employeeList, setEmployeeList] = useState([]);

  const fetchEmployee = () => {
    axios.get("/employee",{ withCredentials: true }).then((response)=>{
      let preData = response.data;
      let postData = [];
      preData.map((item, index) => {
        return postData.push({value: item.id, label:item.first_name + " " +item.last_name });
      })
      setEmployeeList(postData);
  }).catch((err) => {
    console.log(err);
  });
  }

  const fetchTimeSheet = () => {
    axios.post("/timesheet",{ withCredentials: true }).then((response)=>{
      setTimeSheet(response.data)
  }).catch((err) => {
    console.log(err);
  });
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      fetchEmployee();
      fetchTimeSheet();
    }
      return () => {
        setEmployeeList([]);
        setTimeSheet([]);
        isMounted = false;}
  },[]);


  return (
    <div>
      <h1>Time Sheet</h1>
      <TimeComponent  listEmployee={employeeList} />
      {(timeSheet) ? (
        timeSheet.map((value, index) => {
              if(value){
                return <TimeComponent listEmployee={employeeList} timeData={value} />
              }
      })): (<></>)}
      <Button className="newEmp">
          Track New Time
        </Button>
    </div>
  );
}

export default TimeSheet;
