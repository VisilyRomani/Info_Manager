import React, {useState} from 'react';
import authService from './authService';
import Logo from "../../asset/Sprouts-Logo-Front-BG.jpg";
import './LoginPage.css'

const LoginPage = (props) => {
    const [input, setInput] = useState({username:'', password:''});
    const {username, password} = input
    const [message, setMessage] = useState('');
    const[show, setShow] = useState(false);

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setInput(inputs => ({ ...inputs, [name]: value}))
    }

    const DismissableAlert = () => {
        if (show) {
            return (
                <div className='DisAlert'> {message}</div>
            )
        }else{
            return(<></>)
        }
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        setMessage('');
        if(!username || !password){
            setMessage(' - This field is required.')
            setShow(true);
        }else{
             authService.login(username, password).then( ()=> {
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

    // TODO: refactor the login system and create new css for it
        // Needs a onChange function for the inputs
    return (
        <div>
            <div className='bg'/>
                <div className='LoginItems'>
                </div>
                <form onSubmit={handleLogin} className='loginForm formFlex p-3 mb-5 rounded'>
                    <img className='logo' src={Logo} alt=''></img>
                    
                    <label htmlFor='username' >Username :</label><br/>
                    <DismissableAlert/>
                    <input type="text" id="username" name="username" className='loginInput' onChange={onChangeInput}></input>

                    <label htmlFor="password">Last name:</label><br/>
                    <DismissableAlert/>

                    <input type="password" id="password" name="password" className='loginInput'onChange={onChangeInput}></input>

                    <input type="submit" value="Submit" className='submitForm'/>
                    {/* <button variant='primary' type='submit' onClick={handleLogin}>Submit</button> */}
                </form>
        </div>
    )
}
export default LoginPage;
