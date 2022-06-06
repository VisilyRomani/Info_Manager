import React, { useEffect, useState, useLayoutEffect } from "react";
import { TimeComponentAbstract } from "../components/reusable/TimeComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewTime } from "../components/reusable/NewTime";
import axios from "axios";
import "../css/TimeSheet.css";

/* 
TODO: each person now has a unique date so once they check in they cant check in again
*/

function TimeSheet() {
  // State of the Time Sheet
  const [timeSheet, setTimeSheet] = useState([]);
  // list of employee
  const [employeeList, setEmployeeList] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date(startDate.getDate() - 5));

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // tokens used to cancel axios when unmounted
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Formats the Employee data {value:id,label:name}
    const formatData = (data) => {
      return data.map((elem) => {
        return {
          value: elem.employee_id,
          label: elem.first_name + " " + elem.last_name,
        };
      });
    };
    // API call to get Employee data
    const axiosEmployee = async () => {
      await axios
        .get(
          "/employee",
          { cancelToken: source.token },
          { withCredentials: true }
        )
        .then((employeeData) => {
          setEmployeeList(formatData(employeeData.data));
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("aborted");
          } else {
            console.error(err);
          }
        });
    };
    // start Axios call
    axiosEmployee();
    return () => {
      // cancels the async http requests when unmounted
      source.cancel();
    };
  }, []);

  // TODO: Seperate out functions where one gets info from prev weeks and one to update baseed on current week
  /**
   * first function
   *  this gets the inital data
   *  only runs once
   *  initially gets the first seven days
   *  puts first week info into first seven days
   *
   *
   * second function
   *  runs whenever clock in or prev week
   *  gets info from database
   */
  useLayoutEffect(() => {
    // tokens used to cancel axios when unmounted
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const axiosTimesheet = async () => {
      // Post request for timesheet data
      axios
        .post(
          "/timesheet",
          { startDate },
          { cancelToken: source.token },
          { withCredentials: true }
        )
        .then((tsData) => {
          const dates = [...Array(7)].map((_, i) => {
            const itrDate = new Date(startDate);
            return {
              date: new Date(
                itrDate.setDate(itrDate.getDate() - i)
              ).toDateString(),
              data: [],
            };
          });
          console.log(tsData.data);
          dates.forEach((dayElem, index) => {
            tsData.data.forEach((elem) => {
              if (
                new Date(elem.start_time).toDateString() ===
                new Date(dayElem.date).toDateString()
              ) {
                dates[index].data.push(elem);
              }
            });
          });
          setTimeSheet((timeSheet) => [...timeSheet, ...dates]);
          // console.log(timeSheet);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("aborted");
          } else {
            console.error(err);
          }
        });
    };

    axiosTimesheet();
    return () => {
      // cancels the async http requests when unmounted
      source.cancel();
      setDate();
    };
  }, [startDate]);

  // useEffect(() => {
  //   // tokens used to cancel axios when unmounted
  //   const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();

  //   const axiosTimesheet = async () => {
  //     // Post request for timesheet data
  //     axios
  //       .post(
  //         "/timesheet",
  //         { startDate },
  //         { cancelToken: source.token },
  //         { withCredentials: true }
  //       )
  //       .then((tsData) => {
  //         timeSheet.forEach((elem) => {
  //           console.table(elem.date);
  //           console.log(tsData.data);

  //           /**
  //            * i have local data from timesheet
  //            * I have data from database
  //            *
  //            *  for ts in timehseet
  //            *    for db in database
  //            *      if ts.data.start_time
  //            *          if item.date
  //            *
  //            */

  //           tsData.forEach((tsDataElem) => {
  //             console.log(tsDataElem);
  //             // if (new Date(elem.date).toDateString() ===
  //             // new Date(tsDataElem.date).toDateString()) {

  //             // }
  //           });
  //         });
  //         // setTimeSheet((timeSheet) => [...timeSheet, ...dates]);
  //         // console.log(timeSheet);
  //       })
  //       .catch((err) => {
  //         if (axios.isCancel(err)) {
  //           console.log("aborted");
  //         } else {
  //           console.error(err);
  //         }
  //       });
  //   };

  //   axiosTimesheet();
  //   return () => {
  //     // cancels the async http requests when unmounted
  //     source.cancel();
  //     setDate();
  //   };
  // }, [date]);

  const updateDate = () => {
    setDate(new Date());
  };

  const timesheetPrev = () => {
    setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
    const dates = [...Array(7)].map((_, i) => {
      const itrDate = new Date(startDate);
      return {
        date: new Date(itrDate.setDate(itrDate.getDate() - i)).toDateString(),
        data: [],
      };
    });
  };

  return (
    <div className="fade-body">
      <h1>Time Sheet</h1>
      <NewTime listEmployee={employeeList} timesheetCallback={updateDate} />
      <button onClick={timesheetPrev}>prev</button>
      {/* <InfiniteScroll
        dataLength={timeSheet.length}
        next={timesheetPrev}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
    </InfiniteScroll> */}
      <TimeComponentAbstract
        timesheet={timeSheet}
        timesheetCallback={updateDate}
        timesheetDate={new Date().toDateString()} // put date here when infinite loading
      />
    </div>
  );
}

export default TimeSheet;
