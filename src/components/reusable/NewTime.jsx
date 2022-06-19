// import React, { useState } from "react";
// import axios from "axios";
// import Select from "react-select";

// export function NewTime({ listEmployee, timesheetCallback }) {
//   const [employee, setEmployee] = useState();

//   const sendStartTime = async (time) => {
//     console.log(employee);
//     await axios
//       .post("/starttime", [employee, time], { withCredentials: true })
//       .then((response) => {})
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleTime = () => {
//     let curTime = new Date();
//     if (employee !== undefined) {
//       sendStartTime(curTime);
//       timesheetCallback();
//     } else {
//       alert("Choose Employee to clock in!");
//     }
//   };

//   const CurrentDate = () => {
//     let curTime = new Date();
//     let date =
//       curTime.getFullYear() +
//       "-" +
//       (curTime.getMonth() + 1) +
//       "-" +
//       curTime.getDate();
//     return <div className="current-date">{date}</div>;
//   };

//   return (
//     <div>
//       <div className="new-time-container">
//         <CurrentDate />
//         <Select
//           options={listEmployee}
//           onChange={(options) => {
//             setEmployee(options);
//           }}
//           className="employeeSelect"
//         />
//         <Button variant="outline-primary" onClick={handleTime}>
//           Clock In
//         </Button>
//       </div>
//     </div>
//   );
// }
