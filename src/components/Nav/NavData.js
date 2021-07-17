import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";

// TODO: client change icon
export const NavData = [
  {
    title: "Schedule",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: <AiIcons.AiFillCalendar />,
    cName: "nav-text",
  },
  {
    title: "Time Sheet",
    path: "/timesheet",
    icon: <IoIcons.IoPeople />,
    cName: "nav-text",
  },
  {
    title: "Quotes",
    path: "/quotes",
    icon: <AiIcons.AiFillBook />,
    cName: "nav-text",
  },
  {
    title: "Clients",
    path: "/clients",
    icon: <AiIcons.AiFillBook />,
    cName: "nav-text",
  },
];
