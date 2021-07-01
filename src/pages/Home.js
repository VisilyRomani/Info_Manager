import React, {useState, useEffect, useReducer} from 'react';
// import * as AiIcons from 'react-icons/ai';
import moment from 'moment'; 
import {socket} from '../socket';
import Button from '../components/reusable/Button';
import Modal from '../components/reusable/Modal';
import '../css/Home.css';

//TODO:
    // get data from here into the modal
    // store the data for date into the useReducer of the modal toggle

function Home() {
    const [weekDates, setWeekDates] = useState([]);
    const [jobs, setJobs] = useState();
    //FIXME: Might not need this anymore
    // const {toggle, visible} = useModal();

    // FIXME: change this into a reducer
    const [isModalActive, setIsModalActive] = useState({
        newJob:false,
        oldJob:{active:false, date:''}
    });
    
    
    
    // use to set initial state for days of week
    useEffect(() => {
        let cur = moment();
        let firstday = cur.clone().weekday(0);
        let lastday = cur.clone().weekday(6);
        
        let dates = [firstday,lastday];
        setWeekDates(dates);
    }, [])

    // FIXME: This needs to be changed
    useEffect(() => {
        isModalActive.newJob && (document.body.style.overflow = 'hidden');
        !isModalActive.newJob && (document.body.style.overflow = 'unset');
     }, [isModalActive.newJob]);
    
    
     // Goes through and sets initial data for the jobs state
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
        

    // FIXME: probably will remove this
    const toggle = () => {setIsModalActive(isModalActive.newJob = !isModalActive.newJob)}

    // Sets the weekDate to previous week
    const prevWeek = () => {
        const first = weekDates[0].clone().add(-7,'days');
        const last = weekDates[1].clone().add(-7,'days');
        setWeekDates([first ,last] )
    }

    // Sets the weeks to next week
    const nextWeek = () => {
        const first = weekDates[0].clone().add(7,'days');
        const last = weekDates[1].clone().add(7,'days');
        setWeekDates([first ,last] )
    }


    const newJob = () => {
        console.log("asfd")
    }


    // Display the inital 7 days of the week dynamically
    const ShowWeeks = (props) => {
        // Maps the 7 days of the week from jobs
            // alterItem - classname for alternate item
        const dayofweek = props.jobs.map((day,index) => {
            return( 
                <div className='altrItem' key={day.day} onClick={toggle}>
                    <div className='box'>
                        <h2 className='weekDate'>
                            { day.day.format('MMMM') + " " + day.day.format('dddd') +" "+ day.day.date()}
                        </h2>
                    </div>
                    <div className='numJobs'>Job Count: {day.jobs.length}</div>
                </div>)
                }
            );   
        return(
            <div className='topLevelJob'>
                {dayofweek}
            </div>
            )
    }


    // Root where things are displayed
    if(weekDates[0] && jobs !== undefined){
        console.log(isModalActive.isActive)
        return (
            <>
                <div className='mainData'>
                    <div className='weekButtons'>
                        <Button handleClick={prevWeek} label='Prev' />
                        <Button handleClick={nextWeek} label='Next' />
                    </div>
                    <ShowWeeks jobs={jobs}/>
                    <Button handleClick={newJob} id='newJobButton' label='Add Job'/>
                </div>
                <Modal toggle={toggle} visible={isModalActive.isActive}/>
            </>
        )        
    }
    else {
        return (<></>)
    }
}

export default Home
