import React, {useState, useEffect} from 'react';
import * as AiIcons from 'react-icons/ai'; 
import {socket} from '../socket'
import './home.css';
// import io from 'socket.io-client';
// const socketURL = 'http://localhost:5000';
// const socket = io(socketURL);


const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday'];
function Home() {
    const [jobs, setJobs] = useState([]);
    const [weekDates, setWeekDates] = useState([]);

    // use to set initial state for days of week
    useEffect(() => {
        let mounted = true;
        let curr = new Date();
        let first = curr.getDate() - curr.getDay();
        let last = first + 6;

        let lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];
        let firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
        let dates = [firstday,lastday];
        if (mounted){
            setWeekDates(dates);
        }
        return () => {mounted = false};

    }, [])


    // used to get initial data for jobs
    useEffect(() => {
        let mounted = true;
            if(weekDates.length !== 0){
                socket.emit('pgInit', weekDates);
                socket.once('initJobs', (data) => {
                    console.log(data);
                    if (mounted){
                        setJobs(data);
                    }
                })
            }
        return () => {mounted = false};
    },[weekDates]);




    // sets the weekDate to previous week
    const prevWeek = () => {
        const [yyyy, mm, dd] = weekDates[0].split('-');
        const newfirst = new Date(yyyy,mm-1,dd);

        const [year, month, date] = weekDates[1].split('-');
        const newlast = new Date(year,month-1,date);

        const first = new Date(newfirst.setDate(newfirst.getDate()-7)).toISOString().split('T')[0];
        const last = new Date(newlast.setDate(newlast.getDate()-7)).toISOString().split('T')[0];

        setWeekDates([first ,last] )
    }

    // sets the weeks to next week
    const nextWeek = () => {
        const [yyyy, mm, dd] = weekDates[0].split('-');
        const newfirst = new Date(yyyy,mm-1,dd);

        const [year, month, date] = weekDates[1].split('-');
        const newlast = new Date(year,month-1,date);

        const first = new Date(newfirst.setDate(newfirst.getDate()+7)).toISOString().split('T')[0];
        const last = new Date(newlast.setDate(newlast.getDate()+7)).toISOString().split('T')[0];

        setWeekDates([first ,last] )
    }


    // date is the const array for days of week
    // startDate is unknown
    const ShowWeeks = (date) => {
        console.log(date);

        if(date.startDate){
            // reformat this to use day of week from date and not from array
            return(
                <div>
                    <h2>{date.date} {date.startDate}</h2>
                    <div className='jobContainer'>
                        {jobs.map((i) => {
                            return <ShowJobs data={i} day={date.date}></ShowJobs>
                        })}
                    </div>
                    <div>
                        <AiIcons.AiOutlineUserAdd/>
                    </div>
                </div>)
            
        }
        return(
        <div/>)
    }

    const ShowJobs = (jobs) => {
        if(jobs){
            console.log(new Date(jobs.data.book_date).getDay());
            console.log(jobs.day);
        }
        
        if (jobs.data.book_date){
            return(<div>
                {}
                </div>) 
        }
        return(<div>

        </div>)
    }

    if(weekDates[0]){
        return (
            <div>
                <button onClick={prevWeek}>prev</button>
                <button onClick={nextWeek}>next</button>
                {week.map((i , index)=> { 
                     const [yyyy, mm, dd] = weekDates[0].split('-');
                     let newdate = new Date(yyyy,mm-1,dd);
                     newdate = new Date(newdate.setDate(newdate.getDate()+index));
                     return<ShowWeeks key={i} date={i} startDate={newdate.toISOString().split('T')[0]}/>
                    } )}

            </div>
        )        
    }
    return (
        <div>
            {/* loading */}
        </div>
    )
}

export default Home
