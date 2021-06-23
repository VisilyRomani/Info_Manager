import React, {useState, useEffect} from 'react';
import * as AiIcons from 'react-icons/ai';
import moment from 'moment'; 
import {socket} from '../socket';
import './home.css';

function Home() {
    // use to set initial state for days of week
    const [weekDates, setWeekDates] = useState([]);
    useEffect(() => {
        let cur = moment();
        let firstday = cur.clone().weekday(0);
        let lastday = cur.clone().weekday(6);

        let dates = [firstday,lastday];
        setWeekDates(dates);
    }, [])


    // set job data
    const [jobs, setJobs] = useState();
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
                    console.log(iterDate)
                    InitJson[i].day = iterDate;
                }
                    // creates the job info from socket
                for(let i=0; i < data.length;i++){
                    let iter = moment(data[i].book_date)
                    InitJson[iter.day()].jobs.push(data[i]);
                }
                // set the information for the useState
                setJobs(InitJson);
                console.log(InitJson);
                });
        }
            
    },[weekDates]);


    const ShowWeeks = (props) => {
        // map the 7 days of the week from jobs
        const dayofweek = props.jobs.map((day,index) => {
        console.log(day.day.format('dddd'))
            return( 
        <div className='altrItem'>
            <div className='box' key={day.day}>
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

    //  allows you to see and edit data in old job
    const selectedJob = (props) => {

    }

    //TODO:
    // consists of the modal that creates new job
    const [modalDisplay, setModalDisplay] = useState(false);

    const modalToggle = () => setModalDisplay(!modalDisplay);
    
    const NewJob = (props) => {
        // console.log(props.data)
        return(
        <></>
            );
    }


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


    if(weekDates[0] && jobs !== undefined){
        return (
            <div className='mainData'>
                <div className='weekButtons'>
                    <button className='PrevButton rounded' onClick={prevWeek}>Prev</button>
                    <button className='NextButton rounded' onClick={nextWeek}>Next</button>
                </div>
                {/* <div id='dispMonth'>{new Date(weekDates[0]).toLocaleString('default', { month: 'long' })} </div> */}
                <ShowWeeks jobs={jobs}/>
                <NewJob/>
            </div>
        )        
    }
    console.log(weekDates + jobs)
    return (
        <div>
            {/* loading */}
        </div>
    )
}

export default Home
