import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setFeaturedPlaylist } from '../../../Reducer/FeaturedPlaylist/FeaturedPlaylistAction'
import { setplaylistID } from '../../../Reducer/PlaylistDetails/playlistDetailsAction'
import './Fplaylist.css'
const FeaturedPlaylist = () => {
    const login = useSelector(state => state.login)
    const fPlaylist = useSelector(state => state.featuredPlaylist)
    const dispatch = useDispatch();
    useEffect(()=>
    {
      const items = async () =>
      {
        const data = await axios.get("https://api.spotify.com/v1/browse/featured-playlists",
        {
            headers : {
                Authorization : "Bearer " + localStorage.getItem('token'),
                "Content-Type" : "application/json"
              },
    
    });
    if(data.status === 200)
    {
        dispatch(setFeaturedPlaylist(data.data.playlists.items))
    }
    else{
        window.location.href = "http://localhost:3000/home";
    }
    }
    items();
    },[login.token, dispatch]) 

    function openPlaylist(data)
    {
        dispatch(setplaylistID(data))
    }
     return (
    <div className='body-container1'>
        
        
          { fPlaylist.items && fPlaylist.items.slice(0,4).map(data =>
                {
                    return(
                        <div key={data.id}>
                            <div className='playlist' onClick={() => openPlaylist(data)} >
                                <NavLink to='/playlist-details'>
                                    {data.images.map(image =>
                                        {
                                            return (
                                                <div className='image' key={image.url}>
                                                    <img src={image.url}/>       
                                                </div>
                                            )
                                        })}
                                        <div className='details'>
                                            <p className='title'>{data.name}</p>
                                            <p className='description'>{data.decription}</p>
                                        </div>                
                                </NavLink>
                            </div>
                        </div>
                    )
                })
            }
        
    </div>
  )
}

export default FeaturedPlaylist
