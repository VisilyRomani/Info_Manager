import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {socket} from '../../socket'

async function sockLogin(cred){
    // socket.on("connection", (socket) => {
    //     socket.on('authenticated', () => {
    //         console.log("yes")
    //     }).emit('authenticate', {cred});
    // })
}

export default function LoginPage({setToken}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await sockLogin({username, password});
        setToken(token);
    }
    


    return (
        <div className="verify-login">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type='text'onChange={ e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={ e => setPassword(e.target.value)}/>
                </label>
            <div>
                <button type='submit'>Submit</button>
            </div>
            </form>
        </div>
    )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
  };

