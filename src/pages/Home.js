import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Button from "../components/reusable/Button";
import axios from "axios";
import { ListJobs } from "../components/reusable/ListJobs";
import 'react-calendar/dist/Calendar.css';
import '../css/Home.css';

function Home() {
  const [value, onChange] = useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  const [job, setJob] = useState([]);

  useEffect(() => {
    let isMounted = true;
      axios.post("/jobdata",{date:value},{ withCredentials: true }).then((response)=>{
        if(isMounted){
          setJob(response.data);
          console.log(response.data)
        }
      }).catch((err) => {
        console.error(err);
      });
      return () => {isMounted = false;}
  },[value]);

  console.log(value)

  return (
    <div className="container">
      <div className="calendarContainer">
        <Calendar 
        onChange={onChange}
        value={value}
        calendarType="US"
        className={['c1','c2']}
        />
      </div>
      <div className="jobParent">
         {/* TODO: add the dnd droppable container here so i can change the data in 
         useState using the array */}
        <ListJobs jobData={job}/>
      </div>
    </div>
  );
}

export default Home;
