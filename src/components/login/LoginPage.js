import React, {useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import authService from './authService';

import Logo from "../../asset/Sprouts-Logo-Front-BG.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const[show, setShow] = useState(false);


    const onChangeUsername = (e) => {
        if(e.target.value===''){
        }
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        if(e.target.value===''){
        }
        setPassword(e.target.value);
    }

    const DismissableAlert = () => {
        if (show) {
            return (
                <text className='DisAlert'> {message}</text>
            )
        }else{
            return(<></>)
        }
    }
    
    const handleLogin = async (e) =>{
        e.preventDefault();
        setMessage('');
        if(!username || !password){
            setMessage(' - This field is required.')
            setShow(true);
        }else{
            await authService.login(username, password).then( ()=> {
                props.history.push('/home');
            },
                (error) => {
                    const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || 
                    error.toString();
                    setMessage(resMessage);
                }
                );
                if (!message){
                    setShow(true);
                }
            }

    }

    return (
        <div>
            <div className='bg'/>
                <div className='LoginItems'>
                </div>
                <Form className='loginForm formFlex shadow-sm p-3 mb-5 rounded'>
                    <img className='logo' src={Logo} alt=''></img>
                    <Form.Group controlId='formUsername' className='formItem'>
                        <Form.Label>Username <DismissableAlert className='DisAlert'/></Form.Label>
                        <Form.Control type='text' placeholder='Username' onChange={onChangeUsername}/>
                    </Form.Group>
                    <Form.Group controlId='formPassword' className='formItem'>
                        <Form.Label>Password  <DismissableAlert className='DisAlert'/></Form.Label>
                        <Form.Control type='password' placeholder='Password' onChange={onChangePassword}/>
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={handleLogin}>Submit</Button>
                </Form>
        </div>
    )
}
export default LoginPage;
