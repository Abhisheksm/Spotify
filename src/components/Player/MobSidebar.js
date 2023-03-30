import React, {useState} from 'react'
import spotify from '../../images/spotify3.png'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './MobSidebar.css'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import setToken from '../../Reducer/Login/loginAction';
import { Home, Side_Profile, Search, side_featured_playlist, side_logout } from '../Constants';
const MobSidebar = () => {
    const dispatch = useDispatch()
    let class_name = ""
    const [open, isOpen] = useState(false)
    if(open === true) {
        class_name = "ham-list";
    }

    const logout = (e)=>
  {
  e.preventDefault()
   dispatch(setToken(''))
   localStorage.clear("token")
   window.location.href = "http://localhost:3000";
 }
  return (
    <div className='ham-sidebar-container'>
        <div className='ham-top'>
        {open ? <AiOutlineClose className='ham-menu' onClick={() =>isOpen(!open)}/> :<AiOutlineMenu className='ham-menu' onClick={() =>isOpen(!open)}/>}
       <img src={spotify} className='ham-logo' alt='spotify_image'/>
        </div>
     {open ?  <ul className={class_name }>
        <li className='ham-list-item' onClick={() =>isOpen(!open)}>
         <NavLink to='/home' style={{'color':'white'}}>
          <HomeIcon/>
          <span>{Home}</span>
         </NavLink>
        </li>
        <li className='ham-list-item' onClick={() =>isOpen(!open)}>
        <NavLink to='/profile' style={{'color':'white'}}>
          <PersonIcon/>
          <span>{Side_Profile}</span>
         </NavLink>
        </li>
        <li className='ham-list-item' onClick={() =>isOpen(!open)}>
        <NavLink to='/search' style={{'color':'white'}}>
          <SearchIcon/>
          <span>{Search}</span>
         </NavLink>
        </li>
        <li className='ham-list-item' onClick={() =>isOpen(!open)}>
        <NavLink to='/featured-playlist' style={{'color':'white'}}>
          <QueueMusicIcon/>
          <span>{side_featured_playlist}</span>
         </NavLink>
        </li>
        <li className='ham-list-item' onClick={() =>isOpen(!open)}>
          <ExitToAppIcon onClick={logout}/>
          <span onClick={logout} style={{'position': 'absolute'}}>{side_logout}</span> 
        </li>
      </ul> : ""}
    </div>
  )
}

export default MobSidebar
