import React, { useState, useEffect } from "react";
// import * as AiIcons from 'react-icons/ai';
import moment from "moment";
import { socket } from "../socket";
import Button from "../components/reusable/Button";
import Modal from "../components/reusable/NewJobModal";
import "../css/Home.css";

//TODO: get data from here into the modal
// store the data for date into the useReducer of the modal toggle

function Home() {
  const [weekDates, setWeekDates] = useState([]);
  const [jobs, setJobs] = useState();
  const [activeModal, setActiveModal] = useState({
    openModal: false,
    modalDate: "",
    modalJobs: [],
  });

  // const setModalData = (info) => {
  //   setActiveModal({
  //     openModal: true,
  //     modalDate: info.date,
  //     modalJobs: info.jobs,
  //   });
  // };

  // use to set initial state for days of week
  useEffect(() => {
    let init = moment();
    let result = moment(init).utc().add(init.utcOffset(), 'm');
    let firstday = result.clone().weekday(0);
    let lastday = result.clone().weekday(6);

    let dates = [firstday, lastday];
    setWeekDates(dates);
  }, []);

  // Goes through and sets initial data for the jobs state
  // TODO: refactor this to use ... like in the modal
  useEffect(() => {
    if (weekDates.length !== 0) {
      socket.emit("INIT_WEEK", weekDates);
    }
    if (weekDates.length !== 0) {
      socket.once("INIT_JOBS", (data) => {
        let InitJson = [
          { day: "", jobs: [] },
          { day: "", jobs: [] },
          { day: "", jobs: [] },
          { day: "", jobs: [] },
          { day: "", jobs: [] },
          { day: "", jobs: [] },
          { day: "", jobs: [] },
        ];

        // creates the day of the week for the array of json
        for (let i = 0; i < InitJson.length; i++) {
          let iterDate = weekDates[0].clone().add(i, "days");
          InitJson[i].day = iterDate;
        }
        // creates the job info from socket
        for (let i = 0; i < data.length; i++) {
          // let iter = moment(
          //   new Date(data[i].book_date).toISOString().split("T")[0]
          // ); 
          let iter = moment(
            data[i].book_date
          ).utc();
          InitJson[iter.day()].jobs.push(data[i]);
        }
        // set the information for the useState
        setJobs(InitJson);
      });
    }
  }, [weekDates]);

  const toggle = () => {
    setActiveModal({
      openModal: !activeModal.openModal,
      modalDate: activeModal.modalDate,
      modalJobs: activeModal.modalJobs,
    });
  };

  // Sets the weekDate to previous week
  const prevWeek = () => {
    const first = weekDates[0].clone().add(-7, "days");
    const last = weekDates[1].clone().add(-7, "days");
    setWeekDates([first, last]);
  };

  // Sets the weeks to next week
  const nextWeek = () => {
    const first = weekDates[0].clone().add(7, "days");
    const last = weekDates[1].clone().add(7, "days");
    setWeekDates([first, last]);
  };

  const newJob = () => {
    setActiveModal({
      openModal: !activeModal.openModal,
      modalDate: "",
      modalJobs: "",
    });
  };

  // Display the inital 7 days of the week dynamically
  const ShowWeeks = (props) => {
    // Maps the 7 days of the week from jobs
    // alterItem - classname for alternate item
    const dayofweek = props.jobs.map((day, index) => {
      return (
        <div className="altrItem" key={day.day}>
          <div className="box">
            <h2 className="weekDate">
              {day.day.format("MMMM") +
                " " +
                day.day.format("dddd") +
                " " +
                day.day.date()}
            </h2>
          </div>
          <div className="numJobs">Job Count: {day.jobs.length}</div>
        </div>
      );
    });
    return <div className="topLevelJob">{dayofweek}</div>;
  };

  // Root where things are displayed
  if (weekDates[0] && jobs !== undefined) {
    return (
      <>
        <div className="mainData">
          <div className="weekButtons">
            <Button handleClick={prevWeek} label="Prev" />
            <Button handleClick={nextWeek} label="Next" />
          </div>
          <ShowWeeks jobs={jobs} />
          <Button handleClick={newJob} id="newJobButton" label="Add Job" />
        </div>
        <Modal
          toggle={toggle}
          visible={activeModal.openModal}
          date={activeModal.modalDate}
          jobs={activeModal.jobs}
        />
      </>
    );
  } else {
    return <>MISSING DATA OR DATE</>;
  }
}

export default Home;
