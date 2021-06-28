import React, {useState, useEffect} from 'react';
import * as AiIcons from 'react-icons/ai';
import moment from 'moment'; 
import {socket} from '../socket';
import './home.css';

function Home() {
    //TODO:
    const [weekDates, setWeekDates] = useState([]);
    const [jobs, setJobs] = useState();
    const [modalDisplay, setModalDisplay] = useState(false);
    
    
    
    // use to set initial state for days of week
    useEffect(() => {
        let cur = moment();
        let firstday = cur.clone().weekday(0);
        let lastday = cur.clone().weekday(6);
        
        let dates = [firstday,lastday];
        setWeekDates(dates);
    }, [])
    
    
    
    useEffect(() => {
        if (weekDates.length !== 0){
            socket.emit('pgInit', weekDates);
        }
        if (weekDates.length !== 0){
            socket.once('initJobs', (data) => {
                let InitJson = [
                    {day:"", jobs:[]},
                    {day:"", jobs:[]},
                    {day:"", jobs:[]},
                    {day:"", jobs:[]},
                    {day:"", jobs:[]},
                    {day:"", jobs:[]},
                    {day:"", jobs:[]}];
                    
                    // creates the day of the week for the array of json
                    for(let i=0; i < InitJson.length; i++){      
                        let iterDate = weekDates[0].clone().add(i,'days');
                        InitJson[i].day = iterDate;
                    }
                    // creates the job info from socket
                    for(let i=0; i < data.length;i++){
                        let iter = moment(new Date(data[i].book_date).toISOString().split('T')[0])
                        InitJson[iter.day()].jobs.push(data[i]);
                    }
                    // set the information for the useState
                    setJobs(InitJson);
                });
            }
            
        },[weekDates]);
        
    // sets the weekDate to previous week
    const prevWeek = () => {
        const first = weekDates[0].clone().add(-7,'days');
        const last = weekDates[1].clone().add(-7,'days');
        setWeekDates([first ,last] )
    }

    // sets the weeks to next week
    const nextWeek = () => {
        const first = weekDates[0].clone().add(7,'days');
        const last = weekDates[1].clone().add(7,'days');
        setWeekDates([first ,last] )
    }
        
        
    const ShowWeeks = (props) => {
        // map the 7 days of the week from jobs
        const dayofweek = props.jobs.map((day,index) => {
            return( 
                <div className='altrItem'key={day.day}>
                    <div className='box' >
                        <h2 className='weekDate'>
                            { day.day.format('MMMM') + " " +day.day.format('dddd') +" "+ day.day.date()}
                        </h2>
                        <AiIcons.AiOutlineUserAdd id={index} className='AddIcon' onClick={modalToggle}/>
                    </div>
                    <div className='numJobs'>Job Count: {day.jobs.length}</div>
                </div>
            )
        });

    return(
        <div className='topLevelJob'>
            {dayofweek}
        </div>
        )
    }

    if(weekDates[0] && jobs !== undefined){
        return (
            <div className='mainData'>
                <div className='weekButtons'>
                    <button className='transButton' onClick={prevWeek}>Prev</button>
                    <button className='transButton' onClick={nextWeek}>Next</button>
                </div>
                <ShowWeeks jobs={jobs}/>
            </div>
        )        
    }
    else {
        return (<></>)
    }
}

export default Home
