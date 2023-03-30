import React, { useEffect } from 'react'
import './Footer.css'
import PlayerControl from './Footer/PlayerControl';
import CurrentTrack from './Footer/CurrentTrack';
import VolumeControl from './Footer/VolumeControl';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentTrack, setTrack, setTrackURL } from '../../Reducer/CurrentTrack/currentTrackAction';


const Footer = () => {
  const login = useSelector(state => state.login)
  const track = useSelector((state) => state.currentTrack)
  const dispatch = useDispatch();
  useEffect(()=>
  {
    const current = async () =>
    {
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization : "Bearer "+ localStorage.getItem('token'),
          "Content-Type" : "application/json"
        }
      });
    
      if(response.data !== "")
      {
        const {item} = response.data;
        const currentTrack = {
         id: item.id,
         name: item.name,
         artists: item.artists.map(artist => 
          {
            return artist.name
          }),
         image: item.album.images[2].url
        }
        dispatch(setCurrentTrack(currentTrack));
      }
      else{
        const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played",
        {
          params : {
            limit : 1
          },
          headers :{
            Authorization: "Bearer "+ localStorage.getItem('token'),
            "Content-Type": "application/json"
          }
        })
        dispatch(setTrackURL(response.data.items[0].track))
        const currentTrack ={
          id: response.data.items[0].track.id,
          name:response.data.items[0].track.name,
          artists: response.data.items[0].track.artists.map((artist) => artist.name),
          image: response.data.items[0].track.album.images[2].url
        }
        dispatch(setCurrentTrack(currentTrack))
        
      }
    }
    current();
  },[login.token, dispatch])

 
  return (
    <>
    <div className='footer-container'>
        <CurrentTrack/>
        <PlayerControl/>
        <VolumeControl/>
    </div>
    </>
  )
}

export default Footer
