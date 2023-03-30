import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWeekelySongs } from '../../../Reducer/WeekelySongs/WeekelySongsAction'
import './Fplaylist.css'
import { setCurrentTrack, setTrack, setTrackURL } from '../../../Reducer/CurrentTrack/currentTrackAction'
import { setPlayerControls } from '../../../Reducer/PlayerControl/playerControlsAction'
import { song_title } from '../../Constants'
const WeeklySongs = () => {
  const login = useSelector(state => state.login)
  const weekelySongs = useSelector(state => state.weekelySongs)
  const playerControl =useSelector(state => state.playerControls)
const dispatch =useDispatch();

useEffect(() =>
{
  const songs = async() =>
  {
    const data = await axios.get("https://api.spotify.com/v1/me/player/recently-played",
    {
      params: {
        limit: 5
      },
      headers: {
        Authorization : "Bearer "+ localStorage.getItem('token'),
        "Content-Type" : "application/json"
      }
    });
    dispatch(setWeekelySongs(data.data.items));
  }
  songs();
},[login.token, dispatch])

const playSong = (id) =>
{
  if (playerControl.isPlaying === false) {
    dispatch(setPlayerControls(!playerControl.isPlaying))
  }
  dispatch(setTrack(weekelySongs.songs))
   const index = weekelySongs.songs.findIndex(song =>
    {
      return song.track.id === id
    })
    dispatch(setTrackURL(weekelySongs.songs[index].track))
    const currentTrack = {
      id: weekelySongs.songs[index].track.id,
      name: weekelySongs.songs[index].track.name,
      artists: weekelySongs.songs[index].track.artists.map(artist => 
       {
         return artist.name
       }),
      image: weekelySongs.songs[index].track.album.images[2].url
     }
     dispatch(setCurrentTrack(currentTrack));
}

  return (
    <div className='body-container1'>
      {
       weekelySongs.songs && weekelySongs.songs.slice(0,4).map(data =>
          {
            return(
              <div key={data.track.name}>
                <div className='playlist' key={data.track.id}>
                  {data.track.album.images.slice(0,1).map(image =>
                    {
                      return (
                        <div className='image' key={image.url}>
                          <img src={image.url} alt='songs-image'></img>
                        </div>
                      )
                    })}
                    <div className='details'  title={song_title} onClick={() => playSong(data.track.id)}>
                     <p className='title'>{data.track.name}</p>
                     <p className='description'>{data.track.artists[0].name}</p>
                    </div>
                </div> 
              </div>
            )
          })
      }
     
    </div>
  )
}

export default WeeklySongs
