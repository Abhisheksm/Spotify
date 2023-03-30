import React, { useEffect } from 'react'
import '../Body/UserProfile.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {setUserEmail, setURI} from '../../Reducer/UserInfo/Useraction'
import { Profile, open_in_spotify } from '../Constants'

const UserProfile = () => {
  const userInfo = useSelector(state => state.userInfo)
  const dispatch = useDispatch();
  useEffect(()=>
  {
    const getUserInfo = async () =>
    {
      const data = await axios.get("https://api.spotify.com/v1/me",
      {
        headers:{
          Authorization: "Bearer " + localStorage.getItem('token'),
          "Content-Type" : "application/json"
        },
      });
      dispatch(setUserEmail(data.data.email))
      dispatch(setURI(data.data.external_urls.spotify))
    };
    getUserInfo();
  },[dispatch])

  const openProfile =() =>
  {
    window.open(userInfo.uri, '_blank', 'noopener,noreferrer')
  }
  return (
    <div  className='header-body' style={{"color":"white"}}>
      <div className='header-container'>
        <h1>{Profile}</h1>
      </div>
      <div className='header-body'>
       <div className='header-body-container'>
        <div className='header-image'>
        <img src={userInfo.image}/>
        </div>
       <div className='user-info'>
        <h1>{userInfo.name}</h1>
        <h4>{userInfo.email}</h4>
        <button className='open-spotify' onClick={()=>openProfile(userInfo.uri)}>{open_in_spotify}</button>
       </div>
      </div>
    </div>
    </div>
  )
}

export default UserProfile
