import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io5';

export const NavData = [
    {
        title:'Schedule',
        path:"/",
        icon:<AiIcons.AiFillHome />,
        cName:'nav-text'
    },
    {
        title:'Calender',
        path:"/calender",
        icon:<AiIcons.AiFillCalendar/>,
        cName:'nav-text'
    },
    {
        title:'Time Sheet',
        path:"/time-sheet",
        icon:<IoIcons.IoPeople/>,
        cName:'nav-text'
    },
    {
        title:'Quotes',
        path:"/quotes",
        icon:<AiIcons.AiFillBook/>,
        cName:'nav-text'
    }
]