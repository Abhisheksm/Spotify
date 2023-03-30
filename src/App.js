import React,{useEffect, useState} from 'react'
import Login from './components/login/Login'
import Player from './components/Player/Player'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import setToken from '../src/Reducer/Login/loginAction'
import {Route, Routes, useNavigate } from 'react-router-dom'
import UserProfile from './components/Body/UserProfile'
import axios from 'axios'
import { setUserName,setUserImage } from './Reducer/UserInfo/Useraction'
import Playlist from './components/Body/Home/Playlist'
import Sidebar from './components/Player/Sidebar'
import Footer from './components/Player/Footer'
import Auth from './components/login/Auth'
import Search from './components/Body/Search'
import Songs from './components/Body/Home/Songs'
import MobSidebar from './components/Player/MobSidebar'
import NoPageFound from './components/Body/NoPageFound'
import PlaylistDetails from './components/Body/Home/PlaylistDetails'
const App = () => {
  const login = useSelector((state) => state.login)
  const dispatch = useDispatch();
  const navigate =useNavigate()
  let style = 'app-body';
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(()=>
  { 
      const hash = window.location.hash; 
      if(hash)
      {
          const token = hash.substring(1).split("&")[0].split("=")[1]
          dispatch(setToken(token))
          localStorage.setItem("token", token);
          navigate('/home')
      }
      const handleResize = () =>{
        setWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () =>
      {
        window.removeEventListener('resize', handleResize)
      }
  },[])

  const showSidebar = width > 768
  if(showSidebar === true)
  {
    style= 'main-container'
  }
  else{
    style='ham-container'
  }
  useEffect(()=>
  {
    const getUserInfo =async () =>
    {
         const data= await axios.get("https://api.spotify.com/v1/me",
         {
          headers : {
            Authorization : "Bearer " + localStorage.getItem('token'),
            "Content-Type" : "application/json"
        },
         })
         dispatch(setUserName(data.data.display_name))
         dispatch(setUserImage(data.data.images[0].url))
    }
    getUserInfo();
  }, [login.token, dispatch])
  
  return (
      <>
      {localStorage.getItem('token') ? 
      
      <div className='container'>
      <div className={style}>
     {showSidebar ? <Sidebar/> : <MobSidebar/>}
     <Routes> 
      <Route caseSensitive path='/' element ={<Auth><Login/></Auth>}/>
      <Route caseSensitive path='/home' element={<Player/>}/> 
      <Route caseSensitive exact path='/profile' element={<UserProfile/>}/>
      <Route caseSensitive exact path='/featured-playlist' element={<Playlist/>}/>
      <Route caseSensitive path='/search' element={<Search/>}/>
      <Route caseSensitive path='/weekely-songs' element={<Songs/>}/>
      <Route caseSensitive path='/playlist-details' element={<PlaylistDetails/>} />
      <Route path='*' element={<NoPageFound/>}/>
    </Routes>
   </div>
    <div>
     <Footer/>
     </div>  
   </div>
    : <Login/>
    }
      </>
  )
}

export default App
