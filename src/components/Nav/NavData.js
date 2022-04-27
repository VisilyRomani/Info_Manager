import React from "react";
import {AiFillBook, AiFillCalendar, AiFillHome} from "react-icons/ai";
import {IoPeople} from "react-icons/io5";
import {MdPersonPin} from "react-icons/md";
// import { BsPeopleCircle } from "react-icons/bs";
export const NavData = [
  {
    title: "Schedule",
    path: "/home",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: <AiFillCalendar />,
    cName: "nav-text",
  },
  {
    title: "Time Sheet",
    path: "/timesheet",
    icon: <IoPeople />,
    cName: "nav-text",
  },
  {
    title: "Quotes",
    path: "/quotes",
    icon: <AiFillBook />,
    cName: "nav-text",
  },
  {
    title: "Clients",
    path: "/clients",
    icon: <MdPersonPin/>,
    cName: "nav-text",
  },
];
