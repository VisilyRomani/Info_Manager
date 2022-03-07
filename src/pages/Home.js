import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
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
          // sort data from database based on index order
          let preSort = [...response.data];
          preSort.sort(function (a,b){
            return a.sort_int - b.sort_int;
          })
          setJob(preSort);
        }
      }).catch((err) => {
        console.error(err);
      });
      return () => {isMounted = false;}
  },[value]);


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
        <ListJobs jobData={job}/>
      </div>
    </div>
  );
}

export default Home;
