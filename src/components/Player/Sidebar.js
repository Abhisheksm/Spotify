import React, { useState } from 'react'
import './Sidebar.css'
import spotify from '../../images/spotify3.png'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import setToken from '../../Reducer/Login/loginAction';
import { NavLink } from 'react-router-dom';
import { setBody } from '../../Reducer/Body/BodyAction';
import { Home, Side_Profile, Search, side_featured_playlist, side_logout } from '../Constants';
const Sidebar = () => {
  const login = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const [str, setStr] = useState('Home')
  const body = useSelector(state => state.body)
  const handleClick = (str) =>
  {
    dispatch(setBody(str))
    setStr(str)
  }

 const handleLogout = (e)=>
 {
   e.preventDefault()
   dispatch(setToken(''))
   localStorage.clear("token")
 }

  return (
    <div className='sidebar'>
     <img className='sidebar_logo' src={spotify} alt='sptify_image'/>
     
     <div className='sidebar_container'>
      <ul className='sidebar_list'>
        <li className={`${body.body=== 'home' ? 'active' : ''}`}>
          <NavLink to='/home' >
          <div 
          className='sidebar_heading'
          onClick={()=>handleClick('Home')}>
          <HomeIcon/>
          <span style={{"padding":"5px"}}>{Home}</span>
          </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile'>
          <div 
           className='sidebar_heading'
           onClick={()=>handleClick('Profile')}>
          <PersonIcon/>
          <span style={{"padding":"5px"}}>{Side_Profile}</span>
          </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/search'>
          <div 
          className='sidebar_heading' 
          onClick={()=>handleClick('Search')}>
          <SearchIcon/>
          <span style={{"padding":"5px"}}>{Search}</span>
          </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/featured-playlist'>
          <div 
          className='sidebar_heading' 
          onClick={()=>
            {
              setStr('Featured-playlist')
              dispatch(setBody('Featured-playlist'))
            } 
          }>
          <QueueMusicIcon/>
          <span style={{"padding":"5px"}}>{side_featured_playlist}</span>
          </div>
          </NavLink>
        </li>
      </ul>
     </div>
    
     <div className='sidebar_logout' >
     <ul>
      <li>
        <div className='sidebar_heading' onClick={handleLogout}>
        <ExitToAppIcon/>
        <span style={{"padding":"5px"}}><NavLink to='/'>{side_logout}</NavLink></span>
        </div>
        
      </li>
     </ul>
     </div> 
    </div> 
  )
}

export default Sidebar
