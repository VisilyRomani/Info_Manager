import React, {useState, useEffect} from 'react';
import {Modal, Button, } from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai'; 
import {socket} from '../socket';
import './home.css';

function Home() {
    // use to set initial state for days of week
    const [weekDates, setWeekDates] = useState([]);
    useEffect(() => {
        let curr = new Date();
        let first = curr.getDate() - curr.getDay();
        let last = first + 6;


        let firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
        let lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];
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
                    let iterDate = new Date(weekDates[0])
                    iterDate.setDate(iterDate.getDate() + i);
                    InitJson[i].day = iterDate;
                }
                    // creates the job info from socket
                for(let i=0; i < data.length;i++){
                    let iter = new Date(data[i].book_date).getDay() 
                    InitJson[iter].jobs.push(data[i]);
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
        return( 
        <div className='altrItem'>
            <div className='box' key={day.day}>
                <h2 className='weekDate'>
                    {day.day.toLocaleString('en-us', {weekday: 'long'}) + ' ' +
                    day.day.toDateString().split(" ")[2] }  
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
            <>
            <Modal show={modalDisplay} onHide={modalToggle} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>New Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 
                    // put data inserts where you add job and client info
                    */}


                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={modalToggle}>
                    Close
                </Button>
                <Button variant="primary" onClick={modalToggle}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }


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
        console.log(weekDates[0])
        const [yyyy, mm, dd] = String(weekDates[0]).split('-');
        const newfirst = new Date(yyyy,mm-1,dd);

        const [year, month, date] = weekDates[1].split('-');
        const newlast = new Date(year,month-1,date);

        const first = new Date(newfirst.setDate(newfirst.getDate()+7)).toISOString().split('T')[0];
        const last = new Date(newlast.setDate(newlast.getDate()+7)).toISOString().split('T')[0];
        setWeekDates([first ,last] )
    }


    if(weekDates[0] && jobs !== undefined){
        return (
            <div className='mainData'>
                <div className='weekButtons'>
                    <button className='PrevButton rounded' onClick={prevWeek}>Prev</button>
                    <button className='NextButton rounded' onClick={nextWeek}>Next</button>
                </div>
                <div id='dispMonth'>{new Date(weekDates[0]).toLocaleString('default', { month: 'long' })} </div>
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
