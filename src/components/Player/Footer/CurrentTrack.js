import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './CurrentTrack.css'
const CurrentTrack = () => {
    const currentTrack = useSelector(state => state.currentTrack)
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(()=>
    {
        const handleResize = () =>
        {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    },[])

    const showSidebar = width > 768
  return (
    <div>
      {
        currentTrack.currentTrack && (
            <div className='track'>
                <div className='track-image'>
                    <img src={currentTrack.currentTrack.image}  alt="Current tarck"/>
                </div>
                <div className='track-info'>
                    <h5>{currentTrack.currentTrack.name}</h5>
                    {currentTrack.currentTrack.artists && (showSidebar ? <h6>{currentTrack.currentTrack.artists.join(",")}</h6> : "") }
                </div>
            </div>
        )
      }
    </div>
  )
}

export default CurrentTrack
