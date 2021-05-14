import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {NavData} from './NavData'
import * as FaIcons from 'react-icons/fa';
import {IconContext} from 'react-icons'
import './Nav.css'



function Nav() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const closeSide = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown',handleClick);
        }
    }, [])

    const handleClick = e =>{
        if (!closeSide.current.contains(e.target)){
            setSidebar(false)
            return;
            
        }
    }

    return (
        <div>
            <IconContext.Provider value={{color: '#fff'}}>
            <div className='navbar'>
                <Link to="#" className='menu-bar'>
                <FaIcons.FaBars onClick={showSidebar}/>
                </Link>

            </div>
            <nav ref={closeSide} className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    {/* <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li> */}
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
