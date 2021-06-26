import React from 'react'
import { useHistory } from 'react-router'
import './home.css'

function TimeSheet() {
    let history = useHistory();
    const redir = () => {
        history.push('/login')
    }

    const style = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'80vh'
    }
    return (
        <div style={style}>
           <h1>404 Page Not Found!</h1>
           <button onClick={redir} className='transButton'>To Login</button>
        </div>
    )
}

export default TimeSheet
