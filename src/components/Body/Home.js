import React from 'react'
import Header from '../Player/Header'
import WeeklySongs from './Home/WeeklySongs'
import { NavLink } from 'react-router-dom'
import './Home.css'
import FeaturedPlaylist from './Home/FeaturedPlaylist'
import { featured_playlist, see_all, this_week_songs } from '../Constants'
const Home = () => {
  return (
    <>
    <div className='header-home'>
    <Header/>
    <div className='content-body'>
      <div className='body-container'>
        <div className='featured-playlist'>
          <div className='display-flex'>
            <h3 style={{"color": "white"}}>{featured_playlist}</h3>
           <NavLink to='/featured-playlist'>{see_all}</NavLink>
          </div>
          <FeaturedPlaylist/>
        </div>

        <div className='weekely-songs'>
          <div className='display-flex'>
            <h3 style={{"color": "white"}}>{this_week_songs}</h3>
            <NavLink to='/weekely-songs'>{see_all}</NavLink>
          </div>
          <WeeklySongs/>
        </div>
      </div>
    </div>
    </div>
    
    </>
      
  )
}

export default Home
