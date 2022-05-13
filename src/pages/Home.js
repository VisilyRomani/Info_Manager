import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { ListJobs } from "../components/reusable/ListJobs";
import 'react-calendar/dist/Calendar.css';
import '../css/Home.css';
import { Container } from "react-bootstrap";

function Home() {
  const [value, onChange] = useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  const [job, setJob] = useState([]);


  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getJobs = async () => {
      await axios.post("/jobdata",{date:value},{cancelToken:source.token},{ withCredentials: true }).then((response)=>{
         // sort data from database based on index order
         let sortedData = [...response.data];
         
         sortedData.sort( (a,b) => {
           return a.sort_int - b.sort_int;
         });

         setJob(sortedData);
     }).catch((err) => {
       if(axios.isCancel(err)){
         console.log("aborted")
       }else{
         console.error(err);
       }
     });
   }
      getJobs();
      return () => {
        source.cancel();
    }
  },[value]);

  return (
    <Container>
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
    </Container>
  );
}

export default Home;
