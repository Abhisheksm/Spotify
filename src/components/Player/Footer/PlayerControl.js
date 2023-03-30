import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import './PlayerControl.css'
import { setCurrentTrack, setTrack, setTrackURL } from '../../../Reducer/CurrentTrack/currentTrackAction'
import { setAudio, setPlayerControls } from '../../../Reducer/PlayerControl/playerControlsAction'

const PlayerControl = () => {
  const track = useSelector((state) => state.currentTrack)
  const [items, setItems] = useState()
  const playerControls = useSelector(state => state.playerControls)
  const dispatch = useDispatch();
  const audioPlayer = useRef();
  const clickRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-type': 'application/json'
          }
        })
      setItems(response.data.items)
      dispatch(setTrack(response.data.items))
      dispatch(setAudio(audioPlayer))
      dispatch(setTrackURL(track.track[0] && track.track[0].track))
    }
    fetchData()
  }, [dispatch])


  const prevTrack = () => {
    if (!playerControls.isPlaying) {
      dispatch(setPlayerControls(!playerControls.isPlaying))
    }
    const index = track.track.findIndex(song => {
      return song.track.id === (track.url.id)
    })
    if (index === 0) {
      dispatch(setTrackURL(track.track[track.track.length - 1].track))
      const currentTrack = {
        id: track.track[track.track.length - 1].track.id,
        name: track.track[track.track.length - 1].track.name,
        artists: track.track[track.track.length - 1].track.artists.map(artist => {
          return artist.name
        }),
        image: track.track[track.track.length - 1].track.album.images[2].url
      }
      dispatch(setCurrentTrack(currentTrack));
      audioPlayer.current.currentTime=0;
    }
    else {
      dispatch(setTrackURL(track.track[index - 1].track))
      const currentTrack = {
        id: track.track[index - 1].track.id,
        name: track.track[index - 1].track.name,
        artists: track.track[index - 1].track.artists.map(artist => {
          return artist.name
        }),
        image: track.track[index - 1].track.album.images[2].url
      }
      dispatch(setCurrentTrack(currentTrack));
      audioPlayer.current.currentTime=0;
    }
  }

  const nextTrack = () => {

    if (!playerControls.isPlaying) {
      dispatch(setPlayerControls(!playerControls.isPlaying))
    }
   
    const index = track.track.findIndex(song => {
      return song.track.id === (track.url && track.url.id)
    })
    if (index === track.track.length - 1) {
      dispatch(setTrackURL(track.track[0].track))
      
      const currentTrack = {
        id: track.track[0].track.id,
        name: track.track[0].track.name,
        artists: track.track[0].track.artists.map(artist => {
          return artist.name
        }),
        image: track.track[0].track.album.images[2].url
      }
      dispatch(setCurrentTrack(currentTrack));
      audioPlayer.current.currentTime=0;
    }
    else {
      dispatch(setTrackURL(track.track[index + 1].track))
      
      const currentTrack = {
        id: track.track[index + 1].track.id,
        name: track.track[index + 1].track.name,
        artists: track.track[index + 1].track.artists.map(artist => {
          return artist.name
        }),
        image: track.track[index + 1].track.album.images[2].url
      }
      dispatch(setCurrentTrack(currentTrack));
      audioPlayer.current.currentTime= 0;
    }
    
  }
  const handleIsPlaying = () => {
   
    dispatch(setAudio(audioPlayer))
    const preValue = playerControls.isPlaying;
    dispatch(setPlayerControls(!(playerControls.isPlaying)))
    if (!preValue) {
      audioPlayer.current.play();
    }
    else {
      audioPlayer.current.pause();
    }
  }

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = offset / width * 100;
    audioPlayer.current.currentTime = divprogress / 100 * track.url.length;

  }

  const onPlaying = () => {
    const duration = audioPlayer.current.duration;
    const ct = audioPlayer.current.currentTime;
    dispatch(setTrackURL({ ...track.url, "progress": ct / duration * 100, "length": duration }))
  }

  const formatDuration =(value) =>
  {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${Math.round(secondLeft,2)}` : Math.round(secondLeft,2)}`;
  }

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
        window.removeEventListener('resize', handleResize)
    }
}, [])

const showSidebar = width> 768
let style_player_Container= 'player-container';
let style_navigation = 'navigation';
if(showSidebar === true)
{
 
   style_player_Container = 'player-container';
    style_navigation = 'navigation';
}
else{
  style_player_Container = 'mob-player-container';
   style_navigation = 'mob-navigation';
}
  return (
    <div className='playerControl-Container'>

      <div className={style_player_Container}>
        <div className='previous'>
          <CgPlayTrackPrev onClick={() => prevTrack()} />
        </div>
        <div className='state'>
          <audio src={track.url && track.url.preview_url} preload="metadata" autoPlay ref={audioPlayer} onTimeUpdate={onPlaying} />
          {playerControls.isPlaying ? <BsFillPauseFill onClick={handleIsPlaying} /> : <BsFillPlayFill onClick={handleIsPlaying} />}
        </div>
        <div className='next'>
          <CgPlayTrackNext onClick={() => nextTrack()} />
        </div>
      </div>
      <div className={style_navigation}>
        <span style={{'color':'white', 'marginRight':'1rem'}}>{audioPlayer.current && formatDuration(audioPlayer.current.currentTime)}</span>
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek_bar" style={{ width: `${track.url && track.url.progress + "%"}` }}></div>
        </div>
        <span style={{'color':'white', 'marginLeft':'1rem'}}>{audioPlayer.current && formatDuration(audioPlayer.current.duration)}</span>
      </div>
    </div>
  )
}

export default PlayerControl
