import React, { useEffect, useState } from "react";
import {Button, } from "react-bootstrap";
import { TimeComponent } from "../components/reusable/TimeComponent";
import axios from "axios";
import "../css/TimeSheet.css"

function TimeSheet() {
  const [timeSheet, setTimeSheet] = useState([]);
  // list of employee
  const [employeeList, setEmployeeList] = useState([]);


  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const sortData = (data) => {
      let postData = []
      data.map((item, index) => {
        postData.push({value: item.employee_id, label:item.first_name + " " +item.last_name });
      });
      return postData;
    }

    const axiosCalls = async () => {
      let requestOne = axios.post("/timesheet", {cancelToken:source.token},{ withCredentials: true });
      let requestTwo = axios.get("/employee", {cancelToken:source.token}, { withCredentials: true });

      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data;
        setEmployeeList(sortData(responseTwo));
        setTimeSheet(responseOne);
      })).catch((err) => {
        if (axios.isCancel(err)){
          console.log("aborted2");
        }else{
          console.error(err);
        }
      })
    }

    axiosCalls();
      return () => {
        source.cancel();
      }
  },[]);


  return (
    <div>
      <h1>Time Sheet</h1>
      {/* 
      TODO: Create dedicated input component
        Create a new Time Component that is only entering data and have it callback to this to update the useEffect 
        to add to the list of unfinished jobs 
      TODO: Create a table that only shows the completed sheet values and sum the ones between two dates  
      */}
      <TimeComponent  listEmployee={employeeList}/>
      {(timeSheet) ? (
        timeSheet.map((value, index) => {
          return <TimeComponent listEmployee={employeeList} timeData={value} key={"TC-" +index} />
      })): (<></>)}
      <Button className="newEmp">
          Track New Time
        </Button>
    </div>
  );
}

export default TimeSheet;
