import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Card } from "react-bootstrap";

export const TimeComponentAbstract = ({
  timesheet,
  timesheetCallback,
  timesheetDate,
}) => {
  const TimeComponent = ({ timeData, timesheetCallback }) => {
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [employee, setEmployee] = useState({});
    const [jobId, setJobId] = useState();

    useEffect(() => {
      let isMounted = true;
      if (isMounted && timeData) {
        setStartTime(timeData.start_time);
        console.log(timeData.end_time);
        setEndTime(timeData.end_time);
        setEmployee({
          id: timeData.employee_id,
          first_name: timeData.first_name,
          last_name: timeData.last_name,
        });
        setJobId(timeData.timesheet_id);
      }
      return () => {
        setEmployee();
        setEndTime();
        setStartTime();
        setJobId();
        isMounted = false;
      };
    }, [timeData]);

    const sendEndTime = async (time) => {
      console.log(jobId);
      await axios
        .post("/endtime", [employee, time, jobId], { withCredentials: true })
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    const handleTime = () => {
      let curTime = new Date();
      console.log(endTime);
      if (typeof employee !== undefined && endTime === null) {
        sendEndTime(curTime);
        timesheetCallback();
      }
    };

    const formatDateTime = (dateData) => {
      if (dateData) {
        let DateTime = new Date(dateData);
        let date =
          DateTime.getFullYear() +
          "-" +
          (DateTime.getMonth() + 1) +
          "-" +
          DateTime.getDate();
        return (
          // date +
          // " " +
          DateTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
      }
    };

    return (
      <Card className="ts-card">
        <Card.Body>
          <Card.Title>
            {employee.first_name + " " + employee.last_name}
          </Card.Title>
          <Card.Text>
            Start: {formatDateTime(startTime)}
            <br />
            End: {formatDateTime(endTime)}
          </Card.Text>
          {endTime ? (
            <></>
          ) : (
            <Button variant="outline-primary" onClick={handleTime}>
              Clock Out
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <h3>{timesheetDate}</h3>
      <div className="ts-container">
        {timesheet ? (
          timesheet.map((value, index) => {
            if (
              new Date(value.start_time).toDateString() ===
              new Date().toDateString()
            ) {
              return (
                <TimeComponent
                  timeData={value}
                  key={"TC-" + index}
                  timesheetCallback={timesheetCallback}
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
};
