import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setplaylistDetails } from '../../../Reducer/PlaylistDetails/playlistDetailsAction'
import Header from '../../Player/Header'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './PlaylistDetails.css'
import { setCurrentTrack, setTrack, setTrackURL } from '../../../Reducer/CurrentTrack/currentTrackAction'
import { setPlayerControls } from '../../../Reducer/PlayerControl/playerControlsAction'
import { Playlist } from '../../Constants'
const PlaylistDetails = () => {
    const login = useSelector(state => state.login)
    const playlistDetails = useSelector(state => state.playlistDetails)
    const playerControl = useSelector(state => state.playerControls)
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const track = useSelector(state => state.currentTrack)

    useEffect(()=>{

       const getPlaylistDetails = async () =>
       {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistDetails.id.id}`,
        {
            headers: {
                Authorization : "Bearer " +  localStorage.getItem('token'),
                "Content-Type" : "application/json",
            }
        },[])
        setItems(response.data.tracks.items)
        const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        uri: response.data.uri,
        description : response.data.description.startsWith("<a") ? "" : response.data.description,
        image : response.data.images[0].url,
        tracks : response.data.tracks.items.map(({track}) => ({
            id : track.id,
            name : track.name,
            artists : track.artists.map(artist => artist.name),
            image : track.album.images[2].url,
            duration : track.duration_ms,
            album : track.album.name,
            context_uri : track.uri,
            track_number : track.track_number
        }))
       }
       dispatch(setplaylistDetails(selectedPlaylist))
    }
     getPlaylistDetails()
    },[])

    const msToSeconds =(time) =>
    {
        const minutes = Math.floor(time/60000);
        const seconds = ((time%60000)/1000).toFixed(0);
        return (minutes + ":" + (seconds < 10 ? 0 : "") + seconds);

    }

    const playSong = (id) =>
    {
        if (playerControl.isPlaying === false) {
            dispatch(setPlayerControls(!playerControl.isPlaying))
          }
        dispatch(setTrack(items))
        const index = track.track.findIndex(song =>
            {
                return song.track.id === id
            })
           dispatch(setTrackURL(track.track[index].track))
           const currentTrack = {
            id: track.track[index].track.id,
            name: track.track[index].track.name,
            artists: track.track[index].track.artists.map(artist => 
             {
               return artist.name
             }),
            image: track.track[index].track.album.images[2].url
           }
           dispatch(setCurrentTrack(currentTrack));
    }
  return (
    <div className='header-body'>
        <Header/>
        {
            playlistDetails.details && (
                <>
                <div className='playlist-body'>
                    <div className='playlist-image'>
                     <img src={playlistDetails.details.image}/>
                    </div>
                <div className='playlist-details'>
                   <span className='playlist-type'>{Playlist}</span>
                   <h1 className='playlist-title'>{playlistDetails.details.name}</h1>
                   <p className='playlist-description'>{playlistDetails.details.description}</p>
                </div>
                </div>
                <div className='playlist-list'>
                 <div className='playlist-header-row'>
                 <div className='playlist-col'>
                            <span>#</span>
                        </div>
                        <div className='tracks-col'>
                            <span>TITLE</span>
                        </div>
                        <div className='playlist-col'>
                            <span>ALBUM</span>
                        </div>
                        <div className='playlist-col'>
                            <span>
                                <PlayCircleIcon />
                            </span>
                        </div>
                 </div>
                 <div className='playlist-tracks'>
                    {
                        playlistDetails.details.tracks.map(({
                            id,name,
                            artists,image,
                            duration,
                            album,
                        }, index) =>
                        {
                            return (
                                <div className='tracks-row' key={id} onClick={()=> playSong(id)}>
                                <div className='tracks-col'>
                                  <span>{index+1}</span>
                                </div>
                                <div className='tracks-col tracks-details'>
                                <div className='tracks-image'>
                                 <img src={image} alt='track-image'/>
                                </div>
                                <div className='tracks-info'>
                                    <span className='tracks-name'>{name}</span>
                                    <span>{artists}</span>
                                </div>
                                </div>
                                <div className='tracks-col'>
                                    <span>{album}</span>
                                 </div>
                                <div className='tracks-col'>
                                   <span>{msToSeconds(duration)}</span>
                                </div>

                                </div>
                            )
                        })
                    }

                 </div>
                </div>
                </>
            )
        }
      
    </div>
  )
}

export default PlaylistDetails
