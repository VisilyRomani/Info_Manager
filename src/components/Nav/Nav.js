import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {NavData} from './NavData'
import * as FaIcons from 'react-icons/fa';
import {IconContext} from 'react-icons' 
import {Button} from 'react-bootstrap'
import './Nav.css'



function Nav(props) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const closeSide = useRef();

    useEffect(() => {
        let mounted = true;
        if (mounted) document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown',handleClick);
            mounted=false;
        }
    }, [])

    const handleClick = e =>{
        if (!closeSide.current.contains(e.target)){
            setSidebar(false)
            return;
        }
    }

    const Logout = () => {
        window.location.reload();
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    }

    return (
        <div>
            <IconContext.Provider value={{color: '#fff'}}>
            <div className='navbar'>
                <Link to="#" className='menu-bar'>
                <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                <Button onClick={Logout}>logout</Button>
            </div>
            <nav ref={closeSide} className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    {NavData.map((item,index) =>{
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                            )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </div>
    )
}

export default Nav
