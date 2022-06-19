import React, { useEffect, useState, useLayoutEffect } from "react";


/* 
TODO: each person now has a unique date so once they check in they cant check in again
*/

function TimeSheet() {
  // const [employee, setEmployee] = useState([]);

  // useEffect(() => {
  //   const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();
  //   const axiosEmployee = async () => {
  //     await axios
  //       .get(
  //         "/employee",
  //         { cancelToken: source.token },
  //         { withCredentials: true }
  //       )
  //       .then((employeeData) => {
  //         console.log(employeeData);
  //         setEmployee(
  //           employeeData?.data.map((p) => {
  //             return {
  //               label: p.first_name + " " + p.last_name,
  //               value: p.emplyee_id,
  //             };
  //           })
  //         );
  //       })
  //       .catch((err) => {
  //         if (axios.isCancel(err)) {
  //           console.log("aborted");
  //         } else {
  //           console.error(err);
  //         }
  //       });
  //   };

  //   axiosEmployee;
  // }, []);

  return <></>;
}
// State of the Time Sheet
//   const [timeSheet, setTimeSheet] = useState([]);
//   // list of employee
//   const [employeeList, setEmployeeList] = useState([]);

//   const [startDate, setStartDate] = useState(new Date());
//   // const [endDate, setEndDate] = useState(new Date(startDate.getDate() - 5));

//   const [date, setDate] = useState(new Date());

//   useEffect(() => {
//     // tokens used to cancel axios when unmounted
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();

//     // Formats the Employee data {value:id,label:name}
//     const formatData = (data) => {
//       return data.map((elem) => {
//         return {
//           value: elem.employee_id,
//           label: elem.first_name + " " + elem.last_name,
//         };
//       });
//     };
//     // API call to get Employee data
//     const axiosEmployee = async () => {
//       await axios
//         .get(
//           "/employee",
//           { cancelToken: source.token },
//           { withCredentials: true }
//         )
//         .then((employeeData) => {
//           setEmployeeList(formatData(employeeData.data));
//         })
//         .catch((err) => {
//           if (axios.isCancel(err)) {
//             console.log("aborted");
//           } else {
//             console.error(err);
//           }
//         });
//     };
//     // start Axios call
//     axiosEmployee();
//     return () => {
//       // cancels the async http requests when unmounted
//       source.cancel();
//     };
//   }, []);

//   // TODO: Seperate out functions where one gets info from prev weeks and one to update baseed on current week
//   /**
//    * first function
//    *  this gets the inital data
//    *  only runs once
//    *  initially gets the first seven days
//    *  puts first week info into first seven days
//    *
//    *
//    * second function
//    *  runs whenever clock in or prev week
//    *  gets info from database
//    */
//   useLayoutEffect(() => {
//     // tokens used to cancel axios when unmounted
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();

//     const axiosTimesheet = async () => {
//       // Post request for timesheet data
//       axios
//         .post(
//           "/timesheet",
//           { startDate },
//           { cancelToken: source.token },
//           { withCredentials: true }
//         )
//         .then((tsData) => {
//           const dates = [...Array(7)].map((_, i) => {
//             const itrDate = new Date(startDate);
//             return {
//               date: new Date(
//                 itrDate.setDate(itrDate.getDate() - i)
//               ).toDateString(),
//               data: [],
//             };
//           });
//           console.log(tsData.data);
//           dates.forEach((dayElem, index) => {
//             tsData.data.forEach((elem) => {
//               if (
//                 new Date(elem.start_time).toDateString() ===
//                 new Date(dayElem.date).toDateString()
//               ) {
//                 dates[index].data.push(elem);
//               }
//             });
//           });
//           setTimeSheet((timeSheet) => [...timeSheet, ...dates]);
//           // console.log(timeSheet);
//         })
//         .catch((err) => {
//           if (axios.isCancel(err)) {
//             console.log("aborted");
//           } else {
//             console.error(err);
//           }
//         });
//     };

//     axiosTimesheet();
//     return () => {
//       // cancels the async http requests when unmounted
//       source.cancel();
//       setDate();
//     };
//   }, [startDate]);

//   const updateDate = () => {
//     setDate(new Date());
//   };

//   const timesheetPrev = () => {
//     setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
//     const dates = [...Array(7)].map((_, i) => {
//       const itrDate = new Date(startDate);
//       return {
//         date: new Date(itrDate.setDate(itrDate.getDate() - i)).toDateString(),
//         data: [],
//       };
//     });
//   };

//   const timesheetNext = () => {
//     setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
//     const dates = [...Array(7)].map((_, i) => {
//       const itrDate = new Date(startDate);
//       return {
//         date: new Date(itrDate.setDate(itrDate.getDate() - i)).toDateString(),
//         data: [],
//       };
//     });
//   };

//   return (
//     <div className="fade-body">
//       <h1>Time Sheet</h1>
//       <NewTime listEmployee={employeeList} timesheetCallback={updateDate} />
//       <div>
//         <button onClick={timesheetPrev}>prev</button>
//         <button onClick={timesheetNext}>next</button>
//       </div>
//       <TimeComponentAbstract
//         timesheet={timeSheet}
//         timesheetCallback={updateDate}
//         timesheetDate={new Date().toDateString()} // put date here when infinite loading
//       />
//     </div>
//   );
// }

export default TimeSheet;
