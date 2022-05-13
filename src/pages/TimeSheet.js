import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TimeComponent } from "../components/reusable/TimeComponent";
import { NewTime } from "../components/reusable/NewTime";
import axios from "axios";
import "../css/TimeSheet.css";

/* 
TODO: Combine the 
*/

function TimeSheet() {
  // State of the Time Sheet
  const [timeSheet, setTimeSheet] = useState([]);
  // list of employee
  const [employeeList, setEmployeeList] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // tokens used to cancel axios when unmounted
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Formats the Employee data {value:id,label:name}
    const formatData = (data) => {
      let postData = [];
      data.map((item, index) => {
        postData.push({
          value: item.employee_id,
          label: item.first_name + " " + item.last_name,
        });
      });
      return postData;
    };

    const axiosEmployee = async () => {
      await axios
        .get(
          "/employee",
          { cancelToken: source.token },
          { withCredentials: true }
        )
        .then((employeeData) => {
          setEmployeeList(formatData(employeeData.data));
          console.log(employeeData.data);
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

  useEffect(() => {
    // tokens used to cancel axios when unmounted
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const axiosTimesheet = async () => {
      // Post request for timesheet data
      axios
        .post(
          "/timesheet",
          { cancelToken: source.token },
          { withCredentials: true }
        )
        .then((tsData) => {
          setTimeSheet(tsData.data);
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
  }, [date]);

  const updateDate = () => {
    setDate(new Date());
  };

  return (
    <div>
      <h1>Time Sheet</h1>
      <NewTime listEmployee={employeeList} timesheetCallback={updateDate} />
      <div className="ts-container">
        {timeSheet ? (
          timeSheet.map((value, index) => {
            if (
              new Date(value.start_time).toDateString() ===
              new Date().toDateString()
            ) {
              return (
                <TimeComponent
                  timeData={value}
                  key={"TC-" + index}
                  timesheetCallback={updateDate}
                  className="asdf"
                />
              );
            }
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TimeSheet;
