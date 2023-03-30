import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setCurrentTrack, setTrack, setTrackURL} from '../../../../Reducer/CurrentTrack/currentTrackAction'
import {setPlayerControls} from '../../../../Reducer/PlayerControl/playerControlsAction'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './Track.css'
const Track = () => {
    const search = useSelector(state => state.search)
    const cTrack = useSelector(state => state.currentTrack)
    const dispatch = useDispatch();
    const playerControls = useSelector(state => state.playerControls)
    
    const playSong = (id) =>
    {
      if (playerControls.isPlaying === false) {
        dispatch(setPlayerControls(!playerControls.isPlaying))
      }
      const index= search.track.data.tracks.items.findIndex(song => 
        {
            return song.id === id
        })
    dispatch(setTrackURL(search.track.data.tracks.items[index]))
    const currentTrack = {
        id: search.track.data.tracks.items[index].id,
        name: search.track.data.tracks.items[index].name,
        artists: search.track.data.tracks.items[index].artists.map(artist => 
         {
           return artist.name
         }),
        image: search.track.data.tracks.items[index].album.images[2].url
       }
       dispatch(setCurrentTrack(currentTrack));
    }
  return (
    <>
    {
search.track.data && <div className='content-body'>
<div className='track-container-search'>
        <table>
            <th>#</th>
            <th>Album</th>
            <th>Title</th>
            <th>Artist</th>
        {search.track.data && search.track.data.tracks.items.map((data,index=0,key={index}) =>
        {
            return(
                <tr key={index} className='table-row'>
                <td>{index+1}</td>
                <td>{<img src={data.album.images[0].url} alt='Music'/>}</td>
                <td className='song-details'><h4>{data.name}</h4></td>
                <td >{data.artists[0].name}</td>
                <td style={{"cursor":"pointer"}}><PlayCircleIcon onClick={()=>playSong(data.id)}/></td>
                </tr>
            )
        })}
    </table>   
</div>
</div>
    }
    </>

  )
}

export default Track
